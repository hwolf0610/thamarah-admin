import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CouponService } from "./coupon.service";
import { UtilService } from "../../service/util.service";
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export interface CouponModel {
	description: string,
	couponCode: string;
	offerValue: number;
	startDate: number
	expiryDate: number
	couponType: string,
	status: boolean
}

@Component({
	selector: 'app-coupons',
	templateUrl: './coupons.component.html',
	styleUrls: ['./coupons.component.scss'],
	providers: [DecimalPipe]
})
export class CouponComponent implements OnInit {
	public isLoading = false;
	public coupons: Array<CouponModel> = [];
	public page: number = 1;
	public limit: number = 25;
	public total: number = 0;
	public search: string = '';
	@ViewChild('searchCoupon', { static: true }) searchCoupon: ElementRef;

	constructor(
		private couponService: CouponService,
		private utilService: UtilService
	) {
		this.getAllCoupon();
	}

	ngOnInit() {
		fromEvent(this.searchCoupon.nativeElement, 'keyup').pipe(
			map((event: any) => { return event.target.value; }),
			debounceTime(500),
	  		distinctUntilChanged()
		).subscribe((search: string) => {
			this.page = 1;
			if (search.length > 2) {
				this.search = search;
				this.getAllCoupon();
			} else if (search.length == 0) {
				this.search = '';
				this.getAllCoupon();
			}
			return;
		});
	}

	// Get all coupon
	private getAllCoupon(): void {
		this.isLoading = true;
		this.couponService.getAll(this.page, this.limit, this.search).subscribe((res: any) => {
			this.isLoading = false;
			this.coupons = res.response_data || [];
			this.total = res.total || 0;
		}, error => this.isLoading = false);
	};

	// Updates coupon status
	public updateCouponStatus(id: string, status: boolean): void {
		let body = { status: status };
		this.isLoading = true;
		this.couponService.updateStatus(id, body).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
		}, error => this.isLoading = false);
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllCoupon();
	}

	// Delete coupon
	public deleteCoupon(couponId): void {
		if (confirm(this.utilService.getAlertField())) {
			this.isLoading = true;
			this.couponService.delete(couponId).subscribe((response: any) => {
				this.isLoading = false;
				this.utilService.successMessage(response.response_data);
				this.getAllCoupon();
			}, error => this.isLoading = false);
		}
	}
}
