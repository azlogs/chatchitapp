const contacts = [
    {
        chatchitId: 'contact1',
        avatar: 'https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m',
        fullname: 'contact 1',
        lastMessage: {
            dateSent: '2:33 PM',
            message: '11111111 Lorem Ipsum is simply dummy text of the printing and typesetting industry.?'
        }
    },
    {
        chatchitId: 'contact2',
        avatar: 'https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m',
        fullname: 'contact 2',
        lastMessage: {
            dateSent: '2:01 PM',
            message: 'Contrary to popular belief, Lorem Ipsum is not simply random text'
        }
    },
    {
        chatchitId: 'contact3',
        avatar: 'https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m',
        fullname: 'contact 3',
        lastMessage: {
            dateSent: '2:33 PM',
            message: 'How are you?'
        }
    },
    {
        chatchitId: 'contact4',
        avatar: 'https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m',
        fullname: 'contact 4',
        lastMessage: {
            dateSent: '2:33 PM',
            message: 'How are you?'
        }
    },
    {
        chatchitId: 'contact5',
        avatar: 'https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m',
        fullname: 'contact 5',
        lastMessage: {
            dateSent: '2:33 PM',
            message: 'How are you?'
        }
    }
];

export default function getContacts(name: string) {
    if (name === "") return contacts;
    return contacts.filter((c) => {
        return c.fullname.toLowerCase().indexOf(name.toLowerCase()) >= 0;
    });
}

export const contactApi = {
    getContacts: (name: string) =>{
        if (name === "") return contacts;
        return contacts.filter((c) => {
            return c.fullname.toLowerCase().indexOf(name.toLowerCase()) >= 0;
        });
    },
    getContactByChatchitId : (chatchitId: string) =>{
        if (chatchitId === "") return null;

        var c = contacts.filter((c) => {
            return c.chatchitId.toLowerCase() === chatchitId.toLowerCase();
        });
        if (c.length > 0) return c[0];

        return null;
    }
} 