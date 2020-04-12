import { removeUserSession } from '../../Common';

export default function Logout(){
    removeUserSession();
    window.location.replace(window.location.origin +"/login");
    return null;
    
}