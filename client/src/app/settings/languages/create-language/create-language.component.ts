import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from "../../setting.service";
import { ToastEnum, UtilService } from "../../../../service/util.service";

export interface LanguagesModel {
	languageCode: string;
	languageName: string;
	status: number;
	isDefault: number;
	webJson: string;
	deliveyAppJson: string;
	mobAppJson: string;
	cmsJson: string;
	backendJson: string;
	_id?: string;
}

export interface LanguageListModel {
	English: string;
	alpha2: string;
}

@Component({
	selector: 'app-create-language-component',
	templateUrl: './create-language.component.html',
	styleUrls: ['./create-language.component.scss']
})
export class CreateLanguageComponent implements OnInit {
	public languageData: LanguagesModel;            // contains information to
	public editorOptions = {theme: 'vs-dark', language: 'json', automaticLayout: true};
	public languageId: string = null;          // get's language id from route
	public languageList: Array<LanguageListModel> = [];     // contains the list of global languages
	public englishLangId: string = null;			// contains english language id

	constructor(private utilService: UtilService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private settingsService: SettingService) {
		this.languageData = this.getDefaultValues();
		this.route.params.subscribe(params => {
			this.languageId = params.id;
		});
		this.route.queryParams.subscribe(params => {
			this.englishLangId = params['english'];
		})
		if (!this.languageId) {
			this.getLocalJSONFiles();
		} else {
			this.getLanguageInfo();
		}
	}

	ngOnInit() {
	}


	// get's language information
	private getLanguageInfo(): void {
		const languageList$ = this.http.get('assets/language-list.json');
		const languageData$ = this.settingsService.getLanguageInfo(this.languageId);
		forkJoin([languageList$, languageData$]).subscribe((res: any) => {
			this.languageList = res[0];
			if (res[1].response_code === 200) {
				this.languageData = Object.assign(
					{
						_id: res[1].response_data._id,
						languageCode: res[1].response_data.languageCode,
						languageName: res[1].response_data.languageName,
						cmsJson: JSON.stringify(res[1].response_data.cmsJson, null, 2),
						webJson: JSON.stringify(res[1].response_data.webJson, null, 2),
						mobAppJson: JSON.stringify(res[1].response_data.mobAppJson, null, 2),
						deliveyAppJson: JSON.stringify(res[1].response_data.deliveyAppJson, null, 2),
						backendJson: JSON.stringify(res[1].response_data.backendJson, null, 2),
						status: res[1].response_data.status,
						isDefault: res[1].response_data.isDefault
					});
			}
			const languageInfo = this.languageList.find(language => language.alpha2 === this.languageData.languageCode);
			if (languageInfo) {
				this.languageData.languageName = languageInfo.English;
				this.languageData.languageCode = languageInfo.alpha2;
			} else {
				this.languageData.languageName = null;
				this.languageData.languageCode = null;
			}
		}, () => this.getLocalJSONFiles());
	}

	// get's all local json files as default values
	private getLocalJSONFiles(): void {
		const languageList$ = this.http.get('assets/language-list.json');
		const defaultJSON$ = this.settingsService.getLanguageInfo(this.englishLangId);
		forkJoin([languageList$, defaultJSON$]).subscribe((res: any) => {
			this.languageList = res[0];
			if (res[1].response_code === 200) {
				this.languageData.cmsJson = JSON.stringify(res[1].response_data.cmsJson, null, 4);
				this.languageData.webJson = JSON.stringify(res[1].response_data.webJson, null, 4);
				this.languageData.mobAppJson = JSON.stringify(res[1].response_data.mobAppJson, null, 4);
				this.languageData.deliveyAppJson = JSON.stringify(res[1].response_data.deliveyAppJson, null, 4);
				this.languageData.backendJson = JSON.stringify(res[1].response_data.backendJson, null, 4);
			}
		});
	}

	// set's language code of selected language
	public setLanguageCode(languageInfo: LanguageListModel): void {
		if (languageInfo) {
			this.languageData.languageCode = languageInfo.alpha2;
		} else {
			this.languageData.languageCode = null;
		}
	}

	// get's default values
	private getDefaultValues(): LanguagesModel {
		return {
			languageCode: '',
			languageName: '',
			status: 1,
			isDefault: 0,
			webJson: null,
			mobAppJson: null,
			cmsJson: null,
			deliveyAppJson: null,
			backendJson: null
		}
	}

	public checkType(): void {
		try {
			JSON.parse(this.languageData.cmsJson);
			JSON.parse(this.languageData.webJson);
			JSON.parse(this.languageData.mobAppJson);
			JSON.parse(this.languageData.deliveyAppJson);
			JSON.parse(this.languageData.backendJson);
			if (!this.languageId) {
				this.saveLanguage();
			} else {
				this.updateLanguage();
			}
		} catch (e) {
			this.utilService.showToast("INVALID_JSON", "ERROR", ToastEnum.ERROR)
		}

	}

	// saves a new language information
	private saveLanguage(): void {
		this.settingsService.saveLanguage(this.languageData).subscribe((res: any) => {
			if (res.response_code === 200 || res.response_code === 201) {
				this.utilService.showToast(res.response_data, "SUCCESS", ToastEnum.SUCCESS, true);
				this.router.navigate(['settings/languages']);
			} else {
				this.utilService.showToast(res.response_data, "ERROR", ToastEnum.ERROR, true);
			}
		}, () => this.utilService.showToast("ERROR_DATA", "ERROR", ToastEnum.ERROR));
	}

	// updates language
	private updateLanguage(): void {
		this.settingsService.updateLanguage(this.languageId, this.languageData).subscribe((res: any) => {
			if (res.response_code === 201 || res.response_code === 200) {
				this.utilService.showToast(res.response_data, "SUCCESS", ToastEnum.SUCCESS, true);
				this.router.navigate(['settings/languages']);
			} else {
				this.utilService.showToast(res.response_data, "ERROR", ToastEnum.ERROR, true);
			}
		}, () => this.utilService.showToast("ERROR_DATA", "ERROR", ToastEnum.ERROR));
	}
}
