import {
    CONTACTS,
    LEFT_SIDE,
    WINDOW_CHAT,
    AUTHORIZE
} from './ActionTypes';

export const leftSide = {
    getContact: (name: string) => {
        return { type: LEFT_SIDE.GET_CONTACTS, name };
    }
}

export const chatWindows = {
    getHistories: (keyword: string) => {
        return { type: WINDOW_CHAT.GET_CHAT_HISTORY, keyword };
    },
    sendaMessage: (message: string, from: string, to: string) => {
        return { type: WINDOW_CHAT.SEND_MESSAGE, message, from, to };
    },
    getContactInfo: (chatchitId: string) =>{
        return { type: WINDOW_CHAT.GET_CONTACT_INFO, chatchitId };
    }
}

export function getContact(name: string) {
    return { type: CONTACTS.GET_CONTACTS, name };
}

export const autorize = {
    login: (name: string, password: string) => {
        return { type: AUTHORIZE.LOGIN, name, password };
    },
    logout: () => {
        return { type: AUTHORIZE.LOGOUT };
    }
} 