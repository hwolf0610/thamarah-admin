import { Injectable } from "@angular/core";
import { CrudService } from "../../../service/crud.service";
import { Observable } from "rxjs";

export enum CMS_ROLES {
	ADMIN = 'ADMIN',
	DELIVERY_BOY = 'DELIVERY_BOY'
}

@Injectable()
export class AuthService {
	constructor(private crud: CrudService) {
	}

	// validates admins credentials
	public validateCredentials(credentials): Observable<any> {
		return this.crud.saveData('/users/login', credentials);
	}

	// verifies admin's email and sends OTP to the email
	public verifyEmail(body): Observable<any> {
		return this.crud.saveData('/users/forgot-password', body);
	}

	// verifies OTP entered by admin
	public verifyOTP(body): Observable<any> {
		return this.crud.getData(`/users/verify-otp?email=${body.email}&otp=${body.otp}`);
	}

	// sends request to reset admin's password
	public resetPassword(passwordData): Observable<any> {
		return this.crud.saveData('/users/reset-password', passwordData);
	}
}
