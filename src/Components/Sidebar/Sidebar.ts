export default class Sidebar {
    contacts: Array<ContactModel>;
    constructor() {
        this.contacts = new Array<ContactModel>();
    }
}

class MessageModel {
    dateSent: string;
    message: string;

    constructor() {
        this.dateSent = "";
        this.message = "";
    }
}

class ContactModel {
    chatchitId: string;
    avatar: string;
    fullname: string;
    lastMessage: MessageModel;

    constructor() {
        this.chatchitId = "";
        this.avatar = "";
        this.fullname = "";
        this.lastMessage = new MessageModel();
    }
}