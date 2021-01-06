import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from "../coupon.service";
import { UtilService } from "../../../service/util.service";
import { CouponModel } from '../coupons.component';

@Component({
	selector: 'app-add-edit-coupon',
	templateUrl: './add-edit-coupon.component.html',
	styleUrls: ['./add-edit-coupon.component.scss']
})
export class AddEditCouponComponent implements OnInit {
	public isLoading = false;
	public couponDate: NgbDateStruct;
	public coupon: CouponModel = {
		description: '',
		couponCode: '',
		offerValue: null,
		startDate: null,
		expiryDate: null,
		couponType: '',
		status: true,
	}
	public startDate: NgbDateStruct;
	public endDate: NgbDateStruct;
	public couponId: string = null;

	constructor(
		private utilService: UtilService,
		private router: Router,
		private couponService: CouponService,
		private activatedRoute: ActivatedRoute
	) {
		const date = new Date();
		this.couponDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
		this.activatedRoute.params.subscribe(params => {
			this.couponId = params['id'];
			if (this.couponId) this.getCouponDetail();
		})
	}

	ngOnInit() {
	}

	// Get coupon detail
	public getCouponDetail(): void {
		this.isLoading = true;
		this.couponService.getById(this.couponId).subscribe((res: any) => {
			this.isLoading = false;
			this.coupon = res.response_data;
			this.coupon.startDate = Number(this.coupon.startDate);
			this.coupon.expiryDate = Number(this.coupon.expiryDate);
			this.startDate = {
				year: new Date(this.coupon.startDate).getFullYear(),
				month: new Date(this.coupon.startDate).getMonth() + 1,
				day: new Date(this.coupon.startDate).getDate()
			};
			this.endDate = {
				year: new Date(this.coupon.expiryDate).getFullYear(),
				month: new Date(this.coupon.expiryDate).getMonth() + 1,
				day: new Date(this.coupon.expiryDate).getDate()
			};
		}, error => this.isLoading = false);
	}

	// checks operation type
	public checkOperationType(): void {
		if (this.couponId) this.updateCoupon();
		 else this.saveCoupon();
	}

	// Save coupon
	private saveCoupon(): void {
		this.coupon.startDate = new Date(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`).getTime();
		this.coupon.expiryDate = new Date(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`).getTime();
		this.isLoading = true;
		this.couponService.save(this.coupon).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/coupons']);
		}, error => this.isLoading = false);
	}

	// Update coupon
	public updateCoupon(): void {
		this.coupon.startDate = new Date(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`).getTime();
		this.coupon.expiryDate = new Date(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`).getTime();
		this.isLoading = true;
		this.couponService.update(this.couponId, this.coupon).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/coupons']);
		}, error => this.isLoading = false);
	}
}
