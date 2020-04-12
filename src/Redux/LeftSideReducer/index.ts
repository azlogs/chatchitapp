import { LEFT_SIDE } from './../ActionTypes';
import getContacts from '../../Api/ContactApi';

export function leftSide(state: any = {}, action: any) {
    switch (action.type) {
        case LEFT_SIDE.GET_CONTACTS:
            return { 
                ...state,
                contacts: getContacts(action.name)
            }
        default:
            return state;
    }
}