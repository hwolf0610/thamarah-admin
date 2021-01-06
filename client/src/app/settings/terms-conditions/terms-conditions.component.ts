import { Component } from "@angular/core";
import { SettingService } from "../setting.service";
import { ToastEnum, UtilService } from "../../../service/util.service";
import { PagesEnum, PageTypeModel } from "../about-us/about-us.component";

@Component({
	selector: 'app-terms-conditions-component',
	templateUrl: './terms-conditions.component.html',
	styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent {
	public isLoading = false;
	public pageData: PageTypeModel = {
		pageType: PagesEnum.TERMS_AND_CONDITIONS,
		title: '',
		description: ''
	};

	constructor(
		private settingsService: SettingService,
		private utilService: UtilService
	) {
		this.getTermsAndConditions()
	}

	// Get terms and conditions
	private getTermsAndConditions(): void {
		this.isLoading = true;
		this.settingsService.getTermsAndConditions().subscribe((res: any) => {
			this.isLoading = false
			this.pageData = res.response_data;
		}, error => this.isLoading = false);
	}

	// Update terms and conditions
	public updateTermsAndConditions(): void {
		this.isLoading = true;
		this.pageData.pageType = PagesEnum.TERMS_AND_CONDITIONS;
		this.settingsService.updatePages(this.pageData).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
			this.isLoading = false;
		}, error => this.isLoading = false);
	}
}
