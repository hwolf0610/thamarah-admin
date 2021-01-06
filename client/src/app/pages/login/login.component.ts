import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketSharedService } from '../../SocketShare.service';
import { environment } from '../../../environments/environment';
import { AuthService, CMS_ROLES } from "./auth.service";
import { ToastEnum, UtilService } from "../../../service/util.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public loginDetails = {
		email: '',
		password: ''
	};
	private languageJSON: any;      // contains language JSON

	constructor(private router: Router, private socketService: SocketSharedService, private authService: AuthService, private utilService: UtilService) {
		if (environment['PREDEFINED'] && environment['PREDEFINED'] == true) {
			this.loginDetails = {
				email: 'admin@ionicfirebaseapp.com',
				password: '123456'
			}
		}		  		
	}

	ngOnInit() {
	}

	// sends request to validate credentials entered by admin
	public validateCredentials(): void {
		this.authService.validateCredentials(this.loginDetails).subscribe((res: any) => {
			if (res.response_code == 200) {
				if (res.response_data.role === CMS_ROLES.ADMIN) {
					sessionStorage.setItem('token', btoa(btoa(btoa(res.response_data.token))));
					sessionStorage.setItem('login', JSON.stringify(res.response_data));
					this.socketService.connectToSocketServer();
					this.utilService.showToast("LOGIN_SUCCESS", "SUCCESS", ToastEnum.SUCCESS);
					this.router.navigate(['/dashboard']);
				} else {
					this.utilService.showToast("INVALID_CREDENTIALS", "ERROR", ToastEnum.ERROR);
				}

			} else {
				this.utilService.showToast("INVALID_CREDENTIALS", "ERROR", ToastEnum.ERROR);
			}
		}, (error) => {
			this.utilService.showToast("ERROR_DATA", "ERROR", ToastEnum.ERROR);
		});

	}


}
