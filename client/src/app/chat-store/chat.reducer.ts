import * as ChatActions from "./chat.action";
import { ChatDataModel, ChatUserMessagesModel } from "../settings/chat/chat.component";

// contains
export interface ChatState {
	chatState: ChatAppState;
}

export interface ChatAppState {
	newChat: ChatDataModel;
	message: ChatUserMessagesModel;
}

const initialState: ChatAppState = {
	newChat: null,
	message: null,
};

export function chatReducer(
	state = initialState,
	action: ChatActions.ChatActions
) {
	switch (action.type) {
		case ChatActions.NEW_CHAT_REQ:
			return {
				newChat: action.payload.chatData,
				message: state.message,
			};
		case ChatActions.NEW_MESSAGE:
			return {
				newChat: state.newChat,
				message: action.payload.message,
			};
		default: {
			return state;
		}
	}
}
