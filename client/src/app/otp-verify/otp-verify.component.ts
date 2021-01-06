import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../pages/login/auth.service";
import { ToastEnum, UtilService } from "../../service/util.service";

@Component({
	selector: 'app-otp-verify',
	templateUrl: './otp-verify.component.html',
	styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit {
	public otpData = {
		otp: '',
		email: ''
	};              // contains OTP entered by admin
	constructor(private utilService: UtilService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
		this.activatedRoute.queryParams.subscribe(params => {
			if (params) {
				this.otpData.email = params['email'];
				console.log(this.otpData);
			}
		})
	}

	ngOnInit() {
	}

	// sends request to verify OTP entered by admin
	public verifyOTP(): void {
		this.authService.verifyOTP(this.otpData).subscribe((res: any) => {
			if (res.response_code == 200) {
				this.utilService.showToast(res.response_data.message, "SUCCESS", ToastEnum.SUCCESS, true);
				sessionStorage.setItem('verificationToken', res.response_data.verificationToken);
				this.router.navigate(['/resetpassword'], {queryParams: {email: this.otpData.email}});
			} else {
				this.utilService.showToast(res.response_data, "ERROR", ToastEnum.ERROR, true);
			}
		}, () => this.utilService.showToast("ERROR_DATA", "ERROR", ToastEnum.ERROR));

	}

}
