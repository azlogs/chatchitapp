import { CONTACTS } from './../ActionTypes';
import getContacts from '../../Api/ContactApi';
 
export function contacts(state: any = {}, action: any) {
    switch (action.type) {
        case CONTACTS.GET_CONTACTS:
            return { 
                contacts: getContacts(action.name)
            }
            
        default:
            return state;
    }
}