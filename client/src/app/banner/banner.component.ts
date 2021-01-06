import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BannerService } from "./banner.service";
import { UtilService } from "../../service/util.service";
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export interface BannerModel {
	_id?: string;
	title: string;
	description: string;
	bannerType: string;
	imageUrl: string;
	imageId: string;
	categoryId: string;
	productId: string;
	status: boolean;
	filePath: string;
	categoryName?: string
	productName?: string;
}

@Component({
	selector: 'app-banner-component',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
	public isLoading = false;
	public page: number = 0;
	public limit: number = 25;
	public banners: Array<BannerModel> = [];
	public total: number = 0;
	public search: string = '';
	@ViewChild('searchBanner', { static: true }) searchBanner: ElementRef;

	constructor(
		private bannerService: BannerService, 
		private utilService: UtilService
	) {
		this.getAllBanner();
	}

	ngOnInit() {
		fromEvent(this.searchBanner.nativeElement, 'keyup').pipe(
			map((event: any) => { return event.target.value; }),
			debounceTime(500),
	  		distinctUntilChanged()
		).subscribe((search: string) => {
			this.page = 1;
			if (search.length > 2) {
				this.search = search;
				this.getAllBanner();
			} else if (search.length == 0) {
				this.search = '';
				this.getAllBanner();
			}
			return;
		});
	}

	// Get all banner
	public getAllBanner(): void {
		this.isLoading = true;
		this.bannerService.getAll(this.page, this.limit, this.search).subscribe((res: any) => {
			this.isLoading = false;
			this.banners = res.response_data || [];
			this.total = res.total || 0;
		}, error => this.isLoading = false);
	}

	// Delete banner by bannerId
	public deleteBanner(bannerId: string): void {
		if (confirm(this.utilService.getAlertField())) {
			this.isLoading = true;
			this.bannerService.delete(bannerId).subscribe((res: any) => {
				this.isLoading = false;
				this.utilService.successMessage(res.response_data);
				this.getAllBanner();
			}, error => this.isLoading = false);
		}
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllBanner();
	}
}
