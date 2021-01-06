import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../users/user.service";
import { UtilService } from "../../../service/util.service";

export interface UserInfoModel {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
}

export interface ChangePasswordModel {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

@Component({
	selector: 'app-my-profile-component',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
	public isLoading: boolean = false;
	public myProfileInfo: UserInfoModel = {
		_id: null,
		firstName: '',
		lastName: '',
		mobileNumber: '',
		email: '',
	};
	public changePasswordData: ChangePasswordModel =  {
		confirmPassword: '',
		currentPassword: '',
		newPassword: ''
	};

	constructor(
		private utilService: UtilService,
		private router: Router,
		private userService: UserService
	) {
		this.getMyProfile();
	}

	ngOnInit(): void { }

	// Get my profile
	private getMyProfile() {
		this.isLoading = true;
		this.userService.getMyProfile().subscribe((res: any) => {
			this.isLoading = false;
			this.myProfileInfo = res.response_data;
		}, error => this.isLoading = false);
	}

	// Update my profile
	public updateMyProfile(): void {
		this.isLoading = true;
		this.userService.updateMyProfile(this.myProfileInfo).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.getMyProfile();
		}, error => this.isLoading = false);
	}

	// Change password
	public changePassword(): void {
		this.isLoading = true;
		this.userService.changePassword(this.changePasswordData).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('login');
			this.router.navigate(['login']);
		}, error => this.isLoading = false);
	}
}
