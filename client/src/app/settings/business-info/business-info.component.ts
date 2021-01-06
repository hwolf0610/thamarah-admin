import { Component, OnInit } from '@angular/core';
import { ActiveToast } from 'ngx-toastr';
import { SettingService } from '../setting.service';
import { ToastEnum, UtilService } from "../../../service/util.service";

@Component({
	selector: 'app-business-info',
	templateUrl: './business-info.component.html',
	styleUrls: ['./business-info.component.scss']
})

export class BusinessInfoComponent implements OnInit {
	public isLoading: boolean = false;
	public business = {
		email: '',
		address: '',
		officeLocation: '',
		phoneNumber: '',
		storeName: '',
	};

	constructor(
		public utilService: UtilService,
		public businessService: SettingService
	) {
		this.getBusinessInfo();
	}

	ngOnInit() { }

	// Get business info
	public getBusinessInfo() {
		this.isLoading = true;
		this.businessService.getBusinessInfo().subscribe((res: any) => {
			this.isLoading = false;
			this.business = res.response_data;
		}, error => this.isLoading = false);
	}

	// Update business info
	public updateBusinessInfo(): void | ActiveToast<any> {
		this.isLoading = true;
		this.businessService.updateBusinessInfo(this.business).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.getBusinessInfo();
		}, error => this.isLoading = false);
	}
}

