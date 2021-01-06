import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { environment } from "../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { MessageModel } from "./settings/chat/chat.component";
import { CrudService } from "../service/crud.service";
import { Store } from "@ngrx/store";
import { ChatState } from "./chat-store/chat.reducer";
import * as ChatActions from "./chat-store/chat.action";
import { Router } from "@angular/router";
import { ToastEnum, UtilService } from "../service/util.service";
import { NotificationService } from './notification-list/notification.service';

export enum NotificationType {
	ORDER_PLACED = 'ORDER_PLACED',
	ORDER_CANCELLED = 'ORDER_CANCELLED',
	ORDER_ACCEPTED_BY_DELIVERY_BOY = 'ORDER_ACCEPTED_BY_DELIVERY_BOY',
	ORDER_REJECTED_BY_DELIVERY_BOY = 'ORDER_REJECTED_BY_DELIVERY_BOY'
}

@Injectable()
export class SocketSharedService {
	private socket: SocketIOClient.Socket;
	myId: any;
	public page: number = 1;                                  //sets the page  
	public limit: number = 100;                               // sets the limit 
	private orderSubject = new BehaviorSubject<Object>(null); // emits data when a new order is received
	public order$ = this.orderSubject.asObservable();

	private closeChatSubject = new BehaviorSubject<Object>(null);
	public close$ = this.closeChatSubject.asObservable();

	private languageJSON: any; // contains JSON of selected language
	private role: string = null; // contains role of logged in user
	constructor(
		private utilService: UtilService,
		private crud: CrudService,
		private notificationService: NotificationService,
		private store: Store<ChatState>,
		private router: Router
	) {
		const token = JSON.parse(sessionStorage.getItem("login"));
		if (token) {
			this.myId = token._id;
			this.role = token.role;
		}
		this.crud.language$.subscribe((json) => {
			if (json) {
				this.languageJSON = json;
			}
		});
	}

	public connectToSocketServer() {
		this.socket = io.connect(environment.API_ENDPOINT);
		this.socket.on("connect", () => {
			console.log("Socket connected");
			const token = JSON.parse(sessionStorage.getItem("login"));
			if (token) {
				this.myId = token._id;
				this.role = token.role;
			}
			this.listenToOrderStatusUpdateNotifications();
		});
		this.socket.on("disconnect", () => {
			console.log("Socket disconnected");
		});

	}

	// get's users groups
	public getUserGroups(): Observable<any> {
		return this.crud.getData(`/chats/admin/group/?page=${this.page}&limit=${this.limit}`);
	}

	// get's users chat history
	public getUserChatHistory(chatId: string): Observable<any> {
		return this.crud.getData(`/chats/admin/${chatId}?page=${this.page}&limit=${this.limit}`);
	}

	// send messages to user
	public sendMessage(messageData: MessageModel): void {
		this.socket.emit('message-store-to-user', messageData);
	}

	// listens to incoming messages from user
	public listenToMessages(): void {
		this.socket.on('message-store', (newMessage) => {
			const newMessageData = Array.isArray(newMessage) ? newMessage[0] : newMessage;
			this.store.dispatch(new ChatActions.NewMessageAction({ message: newMessageData }));
		});
	}

	// listens to order status update notifications
	public listenToOrderStatusUpdateNotifications(): void {
		this.socket.on('order-status-update', (notificationData) => {
			const message = this.getMessage(notificationData.notifyType);

			this.notificationService.emitNotificationEvent(true);
			if (Notification.permission === 'granted') {
				new Notification(this.languageJSON["ORDER_INFO"], {
					body: message,
					icon: 'assets/thumbnail.png',
					requireInteraction: false,
					tag: notificationData.orderId
				}).onclick = (event) => {
					window.focus();
					event.preventDefault();
					const url: string = `/orders/view-order/${event.target['tag']}`;
					window.location.href = url;
				};
			} else {
				this.utilService.showToast(message, '', ToastEnum.SUCCESS, true);
			}
		});
	}

	// get's message
	public getMessage(statusCode: string): string {
		switch (statusCode) {
			case NotificationType.ORDER_REJECTED_BY_DELIVERY_BOY:
				return this.languageJSON["DELIVERY_BOY_REJECTED_ORDER"];
			case NotificationType.ORDER_ACCEPTED_BY_DELIVERY_BOY:
				return this.languageJSON["DELIVERY_BOY_ACCEPTED_ORDER"];
			case NotificationType.ORDER_PLACED:
				return this.languageJSON["ORDER_PLACED"];
			case NotificationType.ORDER_CANCELLED:
				return this.languageJSON["ORDER_CANCELLED"];
		}
	}

}
