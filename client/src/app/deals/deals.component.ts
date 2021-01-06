import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DealService } from "./deals.service";
import { UtilService } from "../../service/util.service";
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
export interface DealModel {
	title: string,
	description: string,
	dealPercent: number,
	categoryId: string,
	productId: string,
	imageUrl: string,
	imageId: string,
	dealType: string,
	status: boolean;
	topDeal: boolean,
	filePath: string,
}
@Component({
	selector: 'app-deals',
	templateUrl: './deals.component.html',
	styleUrls: ['./deals.component.scss'],
	providers: [DecimalPipe]
})
export class DealComponent implements OnInit {
	public isLoading = false;
	public deal: Array<DealModel> = [];
	public page: number = 1;
	public limit: number = 25;
	public total: number = 0;
	public search: string = '';
	@ViewChild('searchDeal', { static: true }) searchDeal: ElementRef;

	constructor(
		private utilService: UtilService,
		private dealService: DealService
	) {
		this.getAllDeal();
	}

	ngOnInit() {
		fromEvent(this.searchDeal.nativeElement, 'keyup').pipe(
			map((event: any) => { return event.target.value; }),
			debounceTime(500),
	  		distinctUntilChanged()
		).subscribe((search: string) => {
			this.page = 1;
			if (search.length > 2) {
				this.search = search;
				this.getAllDeal();
			} else if (search.length == 0) {
				this.search = '';
				this.getAllDeal();
			}
			return;
		});
	}

	// Get all deal
	private getAllDeal(): void {
		this.isLoading = true;
		this.dealService.getAll(this.page, this.limit, this.search).subscribe((res: any) => {
			this.isLoading = false;
			this.deal = res.response_data || [];
			this.total = res.total || 0;
		}, error => this.isLoading = false);
	}

	// Update deal status
	public updateDealStatus(id: string, status: boolean): void {
		let body = { status: status };
		this.isLoading = true;
		this.dealService.updateStatus(id, body).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.getAllDeal();
		}, error => this.isLoading = false);
	}

	// Delete deal
	public onDelete(dealId: string): void {
		if (confirm(this.utilService.getAlertField())) {
			this.isLoading = true;
			this.dealService.delete(dealId).subscribe((response: any) => {
				this.isLoading = false;
				this.utilService.successMessage(response.response_data);
				this.getAllDeal();
			}, error => this.isLoading = false);
		}
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllDeal();
	}
}
