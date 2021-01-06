import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../login/auth.service";
import { ToastEnum, UtilService } from "../../../service/util.service";

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	public forgotPass = {
		email: '',
	};          // contains email to be verified by server

	constructor(private router: Router, private utilService: UtilService, private authService: AuthService) {

	}

	ngOnInit() {
	}

	// sends request to verify email
	public verifyEmail(): void {
		this.authService.verifyEmail(this.forgotPass).subscribe((res: any) => {
			if (res.response_code == 200) {
				this.utilService.showToast(res.response_data, "SUCCESS", ToastEnum.SUCCESS, true);
				this.router.navigate(['/otpverify'], {queryParams: {email: this.forgotPass.email}});
			} else {
				this.utilService.showToast(res.response_data.message, "ERROR", ToastEnum.ERROR, true);
			}
		}, () => this.utilService.showToast("ERROR_DATA", "ERROR", ToastEnum.ERROR));
	}

}
