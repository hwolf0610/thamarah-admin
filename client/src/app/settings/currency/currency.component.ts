import { Component, OnInit } from '@angular/core';
import { forkJoin } from "rxjs";
import { SettingService } from "../setting.service";
import { UtilService } from "../../../service/util.service";

@Component({
	selector: 'app-currency',
	templateUrl: './currency.component.html',
	styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
	public isLoading = false;
	public currency = {
		currencyCode: '',
		currencySymbol: '',
	}; 
	public worldCurrencies;

	constructor(
		private utilService: UtilService, 
		private settingsService: SettingService
	) {
		this.getWorldCurrencyList();
	}

	ngOnInit() { }

	// Get all currency
	private getWorldCurrencyList(): void {
		this.isLoading = true;
		forkJoin([
			this.settingsService.getCurrencyList(),
			this.settingsService.getCurrency()
		]).subscribe((response) => {
			this.isLoading = false;
			this.worldCurrencies = response[0].response_data;
			this.currency = {
				currencySymbol: response[1].response_data.currencySymbol,
				currencyCode: response[1].response_data.currencyCode
			}
		}, error => this.isLoading = false);
	}

	// Update currency
	public updateCurrency(): void {
		this.isLoading = true;
		this.settingsService.updateCurrency(this.currency).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
			this.isLoading = false;
		}, error => this.isLoading = false);
	}
}
