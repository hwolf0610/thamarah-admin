import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CrudService } from "./crud.service";
import { Observable } from "rxjs";

export enum ToastEnum {
	SUCCESS = 'toast-success',
	ERROR = 'toast-error',
	WARNING = 'toast-warning',
	INFO = 'toast-info'
}

@Injectable({
	providedIn: 'root'
})
export class UtilService {
	private languageJSON: any;			// contains translated json of the selected language

	constructor(private toastrService: ToastrService, private crudService: CrudService) {
		this.crudService.language$.subscribe(language => {
			if (language) {
				this.languageJSON = language;
			}
		})
	}

	// get's language json field
	public getAlertField(): string {
		return this.languageJSON["DELETE_ALERT"];
	}

	// shows toastr based on the type, message and title
	public showToast(messageField: string, titleField: string, type: string, isApiRes?: boolean): void {
		this.toastrService.show(!isApiRes ? this.languageJSON[messageField] : messageField, '', { timeOut: 4000 }, type);
	}

	public successMessage(message: string, isLocal?: boolean): void {
		const msg = isLocal ? this.languageJSON[message] : message;
		this.toastrService.show(msg, '', { timeOut: 4000 }, ToastEnum.SUCCESS);
	}
	public errorMessage(message: string, isLocal?: boolean): void {
		const msg = isLocal ? this.languageJSON[message] : message;
		this.toastrService.show(msg, '', { timeOut: 4000 }, ToastEnum.ERROR);
	}
	public infoMessage(message: string, isLocal?: boolean): void {
		const msg = isLocal ? this.languageJSON[message] : message;
		this.toastrService.show(msg, '', { timeOut: 4000 }, ToastEnum.INFO);
	}
	public warningMessage(message: string, isLocal?: boolean): void {
		const msg = isLocal ? this.languageJSON[message] : message;
		this.toastrService.show(msg, '', { timeOut: 4000 }, ToastEnum.WARNING);
	}

	// public infoMessage(key: string): void {
	// 	this.toastrService.show(this.languageJSON[key], 'INFO', { timeOut: 4000 }, ToastEnum.INFO);
	// }

	// sends form data to upload image
	public uploadImage(formData: FormData): Observable<any> {
		return this.crudService.uploadImage(formData);
	}

	// sends form data to upload multiple image
	public uploadMultipleImage(formData: FormData): Observable<any> {
		return this.crudService.uploadMultipleImage(formData);
	}
}
