import { Component, HostBinding } from '@angular/core';
import { SettingService } from '../../settings/setting.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
	//Variables
	currentDate: Date = new Date();
	public storeName: string = null;

	constructor(public businessService: SettingService) {
		this.getBusinessInfo();
	}

	// gets store name
	private getBusinessInfo(): void {
		this.businessService.getBusinessInfo().subscribe((res: any) => {
			if (res.response_data) {
				const businessData = res.response_data;
				this.storeName = businessData.storeName;
			}
		});
	}
}
