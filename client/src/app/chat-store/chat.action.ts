import { Action } from "@ngrx/store";
import { ChatDataModel, ChatUserMessagesModel } from "../settings/chat/chat.component";

export const NEW_CHAT_REQ = "NEW_CHAT_REQ";
export const NEW_MESSAGE = "NEW_MESSAGE";

// this action is used to dispatch when a new new chat is initiated for that location
export class NewChatRequestAction implements Action {
	readonly type = NEW_CHAT_REQ;

	constructor(public payload: {chatData: ChatDataModel}) {
	}
}

export class NewMessageAction implements Action {
	readonly type = NEW_MESSAGE;

	constructor(public payload: {message: ChatUserMessagesModel}) {
	}
}

export type ChatActions = NewChatRequestAction | NewMessageAction;
