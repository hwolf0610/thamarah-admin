import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeliveryBoyService } from "./delivery-boy.service";
import { UtilService } from "../../service/util.service";
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";

export interface DeliveryBoyModel {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string;
	countryCode: string;
}

export interface DialCodeList {
	name: string;
	dial_code: string;
	code: string;
}

@Component({
	selector: 'app-delivery-boy-component',
	templateUrl: './delivery-boy.component.html',
	styleUrls: ['./delivery-boy.component.scss']
})
export class DeliveryBoyComponent implements OnInit {
	public isLoading = false;
	public deliveryBoys: Array<DeliveryBoyModel> = [];
	public page: number = 1;
	public limit: number = 25;
	public total: number = 0;
	public search: string = '';
	@ViewChild('searchDeliveryBoy', { static: true }) searchDeliveryBoy: ElementRef;

	constructor(
		private utilService: UtilService,
		private deliveryBoyService: DeliveryBoyService,
		private router: Router
	) {
		this.getAllDeliveryBoy();
	}

	ngOnInit() {
		fromEvent(this.searchDeliveryBoy.nativeElement, 'keyup').pipe(
			map((event: any) => { return event.target.value; }),
			debounceTime(500),
			distinctUntilChanged()
		).subscribe((search: string) => {
			this.page = 1;
			if (search.length > 2) {
				this.search = search;
				this.getAllDeliveryBoy();
			} else if (search.length == 0) {
				this.search = '';
				this.getAllDeliveryBoy();
			}
			return;
		});
	}

	// Get all delivery boy
	public getAllDeliveryBoy(): void {
		this.isLoading = true;
		this.deliveryBoyService.getAll(this.page, this.limit, this.search).subscribe((res: any) => {
			this.isLoading = false;
			this.deliveryBoys = res.response_data;
			this.total = res.total || 0;
		}, error => this.isLoading = false);
	}

	// Updates status
	public updateStatus(event, id) {
		const body = { status: event };
		this.isLoading = true;
		this.deliveryBoyService.updateStatus(id, body).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
		}, error => this.isLoading = false);
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllDeliveryBoy();
	}
}
