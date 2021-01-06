import { Component, OnInit } from '@angular/core';
import { UtilService } from "../../service/util.service";
import { NotificationService } from "../notification-list/notification.service";

export interface NotificationModel {
	title: string;
	body: string;
}

@Component({
	selector: 'app-notifications-component',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
	public notificationData: NotificationModel = {
		title: '',
		body: ''
	};

	constructor(
		private utilService: UtilService, 
		private notificationService: NotificationService
	) {
		
	}

	ngOnInit() {
	}

	// sends notification data
	public sendNotification(form): void {
		this.notificationService.sendNotification(this.notificationData).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
			form.reset();
		});
	}
}
