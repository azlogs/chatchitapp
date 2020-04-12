import { AUTHORIZE } from '../ActionTypes';

export function authorize(state: any = {}, action: any) {
    switch (action.type) {
        case AUTHORIZE.LOGIN:
            return {
                ...state,
                userProfile: {
                    chatchitId:'phamphuc75',
                    avatar:'https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m',
                    fullname:'Pham Van Phuc',
                    nickname:'Zack',
                    status:'Anything that can wrong, will go wrong'
                }
            }
        case AUTHORIZE.LOGOUT:
            return {
                ...state,
                userProfile: {}
            }
        default:
            return state;
    }
}