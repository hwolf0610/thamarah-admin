import { Component, OnInit } from '@angular/core';
import { LanguagesModel } from './create-language/create-language.component';
import { SettingService } from "../setting.service";
import { ToastEnum, UtilService } from "../../../service/util.service";
import { Router } from "@angular/router";
import { CrudService } from 'service/crud.service';

@Component({
	selector: 'app-languages-component',
	templateUrl: './languages.component.html',
	styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
	public languages: Array<LanguagesModel> = [];           // contains list of languages
	public isDefault: boolean = false;          // set to tru when any one record is set as default language
	constructor(private utilService: UtilService, private settingsService: SettingService, private router: Router, private crud: CrudService) {
		this.getLanguageList();
	}

	ngOnInit() {
	}

	// get's list of languages
	private getLanguageList(): void {
		this.settingsService.getLanguageList().subscribe((res: any) => {
			this.languages = res.response_code === 200 ? res.response_data : [];
		}, () => this.languages = []);
	}

	// get's english language id
	public getEnglishLanguageId(): void {
		const englishData = this.languages.find(lang => lang.languageCode === 'en');
		if (englishData) {
			this.router.navigate(['/settings/add-language'], { queryParams: { english: englishData._id } })
		}
	}

	// updates status
	public changeStatus(status: boolean, id: string): void {
		const body = {
			status: status ? 1 : 0
		};
		this.settingsService.updateLanguageStatus(id, body).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
			this.getLanguageList();
		})
	}

	// sets language as a default language
	public setDefaultLanguage(languageId: string): void {
		this.settingsService.setDefaultLanguage(languageId).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
			this.getLanguageList();
		})
	}

	//delete language 
	deleteLanguage(languageId: string) {
		if (confirm(this.utilService.getAlertField())) {
			this.settingsService.deleteLanguage(languageId).subscribe((res: any) => {
				this.utilService.successMessage(res.response_data);
				this.crud.setLanguageDeleteStatus(true);
				this.getLanguageList();
			});
		}
	}
}
