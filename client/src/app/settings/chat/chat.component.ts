import { Component, OnInit } from '@angular/core';
import { SocketSharedService } from '../../SocketShare.service';
import { Store } from "@ngrx/store";
import { ChatState } from "../../chat-store/chat.reducer";

declare let $: any;

export interface UserGroupsModel {
	_id: string;
	lastMessage: string;
	userName: string;
	updatedAt: string;
}

export interface SelectedChatModel {
	adminId: string;
	userId: string;
	userName: string;
	messages: Array<ChatUserMessagesModel>;
}

export interface ChatUserMessagesModel {
	_id: string;
	message: string;
	sentBy: string;
	updatedAt: string;
	userId: string;
}

export interface ChatDataModel {
	_id: string;
	senderName: string;
	senderId: string;
	receiverId: string;
	status: string;
	messages: Array<MessageModel>;
	lastMessage: string;
	lastMessageTime: number;
	createdAt: number;
}

export interface MessageModel {
	userId: string;
	userName: string;
	storeId: string;
	message: string;
	sentBy: string;
}

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	public chatList: Array<UserGroupsModel> = []; // contains the list of chat initialized
	public selectedChat: SelectedChatModel; // contains information about selected chat
	public messageData: MessageModel; // contains information to send message
	public role: string = null; // contains id of the manager
	private managerName: string = null; // contains name of the manager;
	public myId: string = null; // contains location id of the manager
	public chatId: string = null; // contains _id of the selected chat
	constructor(private socketService: SocketSharedService, private store: Store<ChatState>) {
		const token = JSON.parse(sessionStorage.getItem("login"));
		if (token) {
			this.role = token.role;
			this.myId = token.id;
			this.managerName = token.firstName;
		}
		this.socketService.listenToMessages();
		this.getUserGroupsList();
	}

	// get's default message data
	private getDefaultMessageData(): MessageModel {
		return {
			message: '',
			sentBy: 'STORE',
			userId: this.selectedChat.userId,
			storeId: this.selectedChat.adminId,
			userName: this.selectedChat.userName
		};
	}

	// get's users groups list
	private getUserGroupsList(): void {
		this.socketService.getUserGroups().subscribe((res: any) => {
			this.chatList = res.response_data;
		});
	}

	ngOnInit() {
		this.store.select('chatState').subscribe(chatState => {
			if (chatState.message) {
				const index = this.chatList.findIndex(chat => chat._id === chatState.message.userId);
				if (index !== -1) {
					this.chatList[index].lastMessage = chatState.message.message;
					this.chatList[index].updatedAt = chatState.message.updatedAt
					if (this.selectedChat.userId === chatState.message.userId) {
						this.selectedChat.messages.push(chatState.message);
						this.scrollToBottom();
					}
				} else {
					this.getUserGroupsList();
				}
			}
		})
	}

	// sends message to user
	public sendMessage(): void {
		this.socketService.sendMessage(this.messageData);
		this.messageData = this.getDefaultMessageData();
	}

	// sets the selected chat as current active chat
	public selectChat(chat: UserGroupsModel): void {
		this.chatId = chat._id;
		this.socketService.getUserChatHistory(this.chatId).subscribe((res: any) => {
			this.selectedChat = {
				adminId: this.myId,
				userId: this.chatId,
				messages: res.response_data,
				userName: chat.userName
			};
			this.messageData = this.getDefaultMessageData();
			if (this.selectedChat.messages.length > 0) {
				this.scrollToBottom();
			}
		});
	}

	// automatically scrolls to bottom
	private scrollToBottom() {
		$(document).ready(() => {
			$("#chat-section").animate({
				scrollTop: $("#chat-section").get(0).scrollHeight,
			}, 1000);
		});
	}

}
