import { Component } from "@angular/core";
import { SettingService } from "../setting.service";
import { UtilService } from "../../../service/util.service";

export interface PageTypeModel {
	pageType: string;
	title: string;
	description: string;
}

export enum PagesEnum {
	ABOUT_US = 'ABOUT_US',
	TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
	PRIVACY_POLICY = 'PRIVACY_POLICY'
}

@Component({
	selector: 'app-about-us-component',
	templateUrl: './about-us.component.html',
	styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
	public isLoading = false;
	public pageData: PageTypeModel = {
		pageType: PagesEnum.ABOUT_US,
		title: '',
		description: ''
	};

	constructor(
		private settingsService: SettingService,
		private utilService: UtilService
	) {
		this.getAboutUs();
	}

	// Get about us
	private getAboutUs(): void {
		this.isLoading = true;
		this.settingsService.getAboutUs().subscribe((res: any) => {
			this.isLoading = false
			this.pageData = res.response_data;
		}, error => this.isLoading = false);
	}

	// Update about us
	public updateAboutUs(): void {
		this.isLoading = true;
		this.pageData.pageType = PagesEnum.ABOUT_US;
		this.settingsService.updatePages(this.pageData).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
			this.isLoading = false;
		}, error => this.isLoading = false);
	}
}
