import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from '../setting.service';
import { UtilService } from "../../../service/util.service";

@Component({
	selector: 'app-working-hours',
	templateUrl: './working-hours.component.html',
	styleUrls: ['./working-hours.component.scss']
})
export class WorkingHourComponent implements OnInit {
	public isLoading: boolean = false;
	public workHours = {
		deliveryTimeSlots: [{
			timings: [{
				slot: '',
				openTimeConverted: '',
				closeTimeConverted: '',
				deliveryCount: '',
				isOpen: true,
			}],
			date: '',
			dayCode: '',
			isOpen: true,
		}],
		startDeliveryFrom: null
	};

	constructor(
		private router: Router,
		private utilService: UtilService,
		private settingService: SettingService
	) {
		this.getWorkingHours();
	}

	ngOnInit() { }

	// Get working hours
	public getWorkingHours(): void {
		this.isLoading = true;
		this.settingService.getWorkingHours().subscribe((res: any) => {
			this.isLoading = false;
			this.workHours = res.response_data;
		}, error => this.isLoading = false);
	}

	// Update slot open/close status
	public statusUpdate(data): void {
		data.isOpen = !data.isOpen;
	}

	// Updates working hours
	public updateWorkingHours(): void {
		this.isLoading = true;
		this.settingService.updateWorkingHours(this.workHours).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.getWorkingHours();
		}, error => this.isLoading = false);
	}

}
