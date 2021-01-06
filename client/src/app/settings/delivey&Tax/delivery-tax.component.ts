import { Component, OnInit } from '@angular/core';
import { SettingService } from "../setting.service";
import { UtilService } from "../../../service/util.service";

export interface DeliveryTaxModel {
	_id?: string;
	deliveryType: string;
	taxType: string;
	fixedDeliveryCharges: number;
	deliveryChargePerKm: number;
	location: {
		latitude: number;
		longitude: number;
	},
	taxAmount: number;
	store: string;
	minOrderAmountForFree: number;
	minimumOrderAmountToPlaceOrder: number;
	taxName: string;
	deliveryCoverage: number;
	paymentMethod: Array<string>;
}

export interface PaymentOptionModel {
	title: string;
	value: string;
}

@Component({
	selector: 'app-delivery-tax-component',
	templateUrl: './delivery-tax.component.html',
	styleUrls: ['./delivery-tax.component.scss']
})
export class DeliveryTaxComponent implements OnInit {
	public isLoading: boolean = false;
	public deliveryTaxData: DeliveryTaxModel = {
		deliveryType:'',
		taxType: 'INCLUDED',
		taxAmount: 0,
		fixedDeliveryCharges:  0,
		deliveryChargePerKm: 0,
		location: { latitude: null, longitude: null },
		store: null,
		minOrderAmountForFree: null,
		minimumOrderAmountToPlaceOrder: null,
		taxName: null,
		deliveryCoverage: null,
		paymentMethod: []
	};
	public paymentOptions: Array<PaymentOptionModel> = [
		{ title: 'COD', value: "COD" },
		{ title: "STRIPE", value: "STRIPE" }
	];

	constructor(
		private utilService: UtilService,
		private settingsService: SettingService
	) {
		this.getDeliveryTaxInfo();
	}

	ngOnInit() { }

	// Get delivery tax info
	private getDeliveryTaxInfo(): void {
		this.isLoading = true;
		this.settingsService.getDeliveryAndTaxInfo().subscribe((res: any) => {
			this.isLoading = false;
			this.deliveryTaxData = res.response_data;
		}, error => this.isLoading = false);
	}

	// Update delivery tax info
	public updateDeliveryAndTaxInfo(): void {
		this.isLoading = true;
		if (!this.deliveryTaxData.minOrderAmountForFree || this.deliveryTaxData.minOrderAmountForFree < 0) {
			this.deliveryTaxData.minOrderAmountForFree = 0;
		}
		this.deliveryTaxData.taxType = 'INCLUDED';
		this.settingsService.updateDeliveryTaxInformation(this.deliveryTaxData).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.getDeliveryTaxInfo();
		}, error => this.isLoading = false);
	}
}
