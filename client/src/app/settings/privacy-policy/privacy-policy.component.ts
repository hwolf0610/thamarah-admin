import { Component } from "@angular/core";
import { SettingService } from "../setting.service";
import { UtilService } from "../../../service/util.service";
import { PagesEnum, PageTypeModel } from "../about-us/about-us.component";

@Component({
	selector: 'app-privacy-policy.component',
	templateUrl: './privacy-policy.component.html',
	styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
	public isLoading = false;
	public pageData: PageTypeModel = {
		pageType: PagesEnum.PRIVACY_POLICY,
		title: '',
		description: ''
	};

	constructor(
		private settingsService: SettingService,
		private utilService: UtilService
	) {
		this.getPrivacyPolicy();
	}

	// Get privacy policy
	private getPrivacyPolicy(): void {
		this.isLoading = true;
		this.settingsService.getPrivacyPolicy().subscribe((res: any) => {
			this.isLoading = false
			this.pageData = res.response_data;
		}, error => this.isLoading = false);
	}

	// Update privacy policy
	public updatePrivacyPolicy(): void {
		this.isLoading = true;
		this.pageData.pageType = PagesEnum.PRIVACY_POLICY;
		this.settingsService.updatePages(this.pageData).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
			this.isLoading = false;
		}, error => this.isLoading = false);
	}
}
