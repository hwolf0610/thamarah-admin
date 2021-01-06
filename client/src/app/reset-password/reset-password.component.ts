import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../pages/login/auth.service";
import { ToastEnum, UtilService } from "../../service/util.service";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	public resetPassword = {
		newPassword: '',
		confirmPassword: '',
		email: '',
		verificationToken: ''
	};

	constructor(private router: Router, private utilService: UtilService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
		this.activatedRoute.queryParams.subscribe(params => {
			if (params.email) {
				this.resetPassword.email = params.email;
				this.resetPassword.verificationToken = sessionStorage.getItem('verificationToken');
			}
		})
	}

	ngOnInit() {
	}

	// resets admin password
	public resetAdminPassword(): void {
		const body = {
			newPassword: this.resetPassword.newPassword,
			email: this.resetPassword.email,
			verificationToken: this.resetPassword.verificationToken
		}
		this.authService.resetPassword(body).subscribe((res: any) => {
			if (res.response_code !== 200) {
				return this.utilService.showToast(res.response_data, "ERROR", ToastEnum.ERROR, true);
			}
			this.utilService.showToast(res.response_data, "SUCCESS", ToastEnum.SUCCESS, true);
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('verificationToken');
			this.router.navigate(['login']);
		}, () => this.utilService.showToast("ERROR_DATA", "ERROR", ToastEnum.ERROR, true));
	}

}
