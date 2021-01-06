import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CrudService } from '../../service/crud.service';
import { DeliveryTaxModel } from "./delivey&Tax/delivery-tax.component";
import { LanguagesModel } from "./languages/create-language/create-language.component";
import { ChangePasswordModel, UserInfoModel } from "./my-profile/my-profile.component";
import { PageTypeModel } from "./about-us/about-us.component";


@Injectable({
	providedIn: 'root'
})
export class SettingService {

	constructor(private crud: CrudService) {
	}

	// Get store working hours
	public getWorkingHours(): Observable<any> {
		return this.crud.getData('/settings/admin/delivery-time-slots');
	}

	// Updates store working hours
	public updateWorkingHours(body): Observable<any> {
		return this.crud.updateData('/settings/admin/update/delivery-time-slots', body);
	}

	// get's store business information
	public getBusinessInfo(): Observable<any> {
		return this.crud.getData('/business/admin/detail');
	}

	// Update stores business information
	public updateBusinessInfo(body): Observable<any> {
		return this.crud.updateData('/business/admin/update/', body);
	}

	// Get currency
	public getCurrency(): Observable<any> {
		return this.crud.getData('/settings/admin/currency');
	}

	// updates currency information
	public updateCurrency(currencyData): Observable<any> {
		return this.crud.updateData(`/settings/admin/update/currency`, currencyData);
	}

	// get's delivery and tax settings
	public getDeliveryAndTaxInfo(): Observable<any> {
		return this.crud.getData('/settings/admin/delivery-tax');
	}

	// updates delivery and tax information
	public updateDeliveryTaxInformation(deliveryTaxData: DeliveryTaxModel): Observable<any> {
		return this.crud.updateData('/settings/admin/delivery-tax/update', deliveryTaxData);
	}

	// get's languages list
	public getLanguageList(): Observable<any> {
		return this.crud.getData('/languages/admin/list');
	}

	// get's languages list with default language
	public getLanguageListDefault(): Observable<any> {
		return this.crud.getData('/languages/list');
	}


	// get's language information
	public getLanguageInfo(languageId: string): Observable<any> {
		return this.crud.getData(`/languages/admin/detail/${languageId}`)
	}

	// get's english language information
	public getEnglishLanguageInfo(): Observable<any> {
		return this.crud.getData('/language/en/info')
	}

	// creates a new language record
	public saveLanguage(language: LanguagesModel): Observable<any> {
		return this.crud.saveData('/languages/admin/create', language);
	}

	// updates language record
	public updateLanguage(languageId: string, language: LanguagesModel): Observable<any> {
		return this.crud.updateData(`/languages/admin/update/${languageId}`, language);
	}

	// updates language status
	public updateLanguageStatus(languageId: string, body): Observable<any> {
		return this.crud.updateData(`/languages/admin/status-update/${languageId}`, body);
	}

	// delete language with language id
	public deleteLanguage(languageId: string,): Observable<any> {
		return this.crud.deleteData(`/languages/admin/delete/${languageId}`);
	}

	// sends request to set default language
	public setDefaultLanguage(languageId: string): Observable<any> {
		return this.crud.getData(`/languages/admin/default/${languageId}`);
	}

	// get's about us information
	public getAboutUs(): Observable<any> {
		return this.crud.getData('/pages/admin/about-us');
	}

	// get's privacy policy information
	public getPrivacyPolicy(): Observable<any> {
		return this.crud.getData('/pages/admin/privacy-policy');
	}

	// get's terms and conditions information
	public getTermsAndConditions(): Observable<any> {
		return this.crud.getData('/pages/admin/terms-and-conditions');
	}

	// updates pages based on type
	public updatePages(data: PageTypeModel): Observable<any> {
		return this.crud.updateData(`/pages/admin/update`, data);
	}

	// gets currency list json
	public getCurrencyList(): Observable<any> {
		return this.crud.getData('/settings/admin/currency/list');
	}

}
