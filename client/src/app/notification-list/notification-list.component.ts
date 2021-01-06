import { Component, OnInit } from '@angular/core';
import { NotificationService } from "./notification.service";
import { Router } from '@angular/router';

export interface NotificationListModel {
	createdAt: string;
	isRead: boolean;
	notifyType: string;
	orderID: string;
	orderId: string;
	title: string;
	_id: string;
}

@Component({
	selector: 'app-notification-list',
	templateUrl: './notification-list.component.html',
	styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
	public notificationList: Array<NotificationListModel> = [];			// contains list of notifications
	public page: number = 1;		// contains default page number
	public limit: number = 25;		// shows 25 records per page
	public total: number = 0;			// contains total number of records

	constructor(
		private notificationService: NotificationService,
		private router: Router,
		) {
		this.getNotificationList();
	}

	// get's notification list
	private getNotificationList(): void {
		this.notificationService.getNotificationList(this.page, this.limit).subscribe((res: any) => {
			this.notificationList = res.response_code = 200 ? res.response_data : [];
			this.total = res.response_code = 200 ? res.total : 0;
		});
	}

	// called when page number is changed
	public pageChanged(page: number): void {
		this.page = page;
		this.getNotificationList();
	}

	ngOnInit(): void {
	}

	public viewOrder(notify) {
		this.notificationService.readNotification(notify._id).subscribe(() => {
			this.notificationService.emitNotificationEvent(true);
		});
		this.router.navigate(["/orders/view-order/", notify.orderId]);
	}

}
