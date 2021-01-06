import { Injectable, EventEmitter } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";

@Injectable()
export class NotificationService {
	notifyEvent: EventEmitter<number> = new EventEmitter();

	constructor(
		private crud: CrudService
	) {
	}
	
	// get's notification list
	public getNotificationList(page: number, limit: number): Observable<any> {
		return this.crud.getData(`/notifications/admin/list?page=${page}&limit=${limit}`);
	}

	// get's notification list
	public getLatestNotification(): Observable<any> {
		return this.crud.getData(`/notifications/admin/latest`);
	}

	// sends notification to users
	public sendNotification(notificationData): Observable<any> {
		return this.crud.saveData('/notifications/admin/send', notificationData);
	}

	// read notification
	public readNotification(notificationId): Observable<any> {
		return this.crud.saveData('/notifications/admin/read', { notificationId: notificationId });
	}

	emitNotificationEvent(status) {
		this.notifyEvent.emit(status);
	}

	getNotificationEvent() {
		return this.notifyEvent;
	}
}
