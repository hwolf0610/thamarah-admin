import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class CrudService {
	private orderExportSubject = new BehaviorSubject<boolean>(false);           // set to true when admin requests to export order
	public orderExport$ = this.orderExportSubject.asObservable();           // subscribes to the latest value

	public languageJSON = new BehaviorSubject<any>(null);
	public language$ = this.languageJSON.asObservable();

	private productExportSubject = new BehaviorSubject<boolean>(false);           // set to true when admin requests to export product
	public productExport$ = this.productExportSubject.asObservable();           // subscribes to the latest value

	private languageSubject = new BehaviorSubject<boolean>(false)                   // set to true when language is delete
	public languagedelete$ = this.languageSubject.asObservable();                   // subscribes to the latest value

	constructor(private http: HttpClient, private httpOld: Http) {
	}

	// set's language json
	public setLanguageJSON(languageObs): void {
		languageObs.subscribe(data => {
			this.languageJSON.next(data);
		});
	}

	// set product export status
	public setProductExportRequest(status: boolean): void {
		this.productExportSubject.next(status);
	}

	// set order status export
	public setOrderExportRequest(status: boolean): void {
		this.orderExportSubject.next(status);
	}

	// set language delete status
	public setLanguageDeleteStatus(status: boolean): void {
		this.languageSubject.next(status);
	}

	// uploads image
	public uploadImage(formData): Observable<any> {
		const token = atob(atob(atob(sessionStorage.getItem('token'))));
		let requestOptions = new RequestOptions();
		const headers = new Headers({ 'Authorization': 'Bearer ' + token })
		requestOptions.headers = headers;
		return this.httpOld.post(environment.API_ENDPOINT + '/categories/admin/upload/image', formData, requestOptions).pipe(map(res => res.json()));
	}

	// uploads image
	public uploadMultipleImage(formData): Observable<any> {
		const token = atob(atob(atob(sessionStorage.getItem('token'))));
		let requestOptions = new RequestOptions();
		const headers = new Headers({ 'Authorization': 'Bearer ' + token })
		requestOptions.headers = headers;
		return this.httpOld.post(environment.API_ENDPOINT + '/products/admin/upload/images', formData, requestOptions).pipe(map(res => res.json()));
	}

	// imports product
	public importProduct(url: string, formData) {
		const token = atob(atob(atob(sessionStorage.getItem('token'))));
		let requestOptions = new RequestOptions();
		const headers = new Headers({ 'Authorization': 'Bearer ' + token })
		requestOptions.headers = headers;
		return this.httpOld.post(environment.API_ENDPOINT + url, formData, requestOptions).pipe(map(res => res.json()));
	}

	// get's assets data
	public getAssetData(url: string): Observable<any> {
		return this.http.get(url);
	}

	public getData(url: string): Observable<any> {
		return this.http.get(environment.API_ENDPOINT + url);
	}

	public deleteData(url: string): Observable<any> {
		return this.http.delete(environment.API_ENDPOINT + url);
	}

	public saveData(url: string, body: any): Observable<any> {
		return this.http.post(environment.API_ENDPOINT + url, body);
	}

	public updateData(url: string, body: any): Observable<any> {
		return this.http.put(environment.API_ENDPOINT + url, body);
	}

	public patchData(url: string, body: any): Observable<any> {
		return this.http.patch(environment.API_ENDPOINT + url, body);
	}
}
