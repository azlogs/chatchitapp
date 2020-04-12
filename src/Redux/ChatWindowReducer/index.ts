import { WINDOW_CHAT } from '../ActionTypes';
import getChatHistories from '../../Api/ChatApi';
import { contactApi } from '../../Api/ContactApi';

export function chatWindow(state: any = {}, action: any) {
    switch (action.type) {
        case WINDOW_CHAT.GET_CHAT_HISTORY:
            return {
                ...state,
                chatHistories: getChatHistories(action.keyword)
            }
        case WINDOW_CHAT.SEND_MESSAGE:
            let { chatHistories } = state;
            chatHistories.push({
                chatchitId: action.from,
                message: {
                    dateSent: '2:33 PM',
                    value: action.message
                }
            });
            return {
                ...state,
                chatHistories: chatHistories
            }
        case WINDOW_CHAT.GET_CONTACT_INFO:
            var contact = contactApi.getContactByChatchitId(action.chatchitId);
            return {
                ...state,
                contactInfo: contact
            }
        default:
            return state;
    }
}