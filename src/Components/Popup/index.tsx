import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getContact } from '../../Redux/Actions';
import { push } from 'connected-react-router';
import './popup.css';

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

interface PopupProps {
    contacts?: Array<ContactModel>,
    closeHandler: () => void, //event: React.MouseEvent<HTMLButtonElement>
    dispatch?: Dispatch,
    push?: any
}

class PopupComponent extends React.Component<PopupProps> {

    state = {
        searchInput: ""
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch(getContact(""));
        }
    }

    componentDidUpdate(){
        var searchInput = document.getElementById("searchInput");
        searchInput?.focus();
    } 

    formClick = (e: MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        if (target.className === "popup") {
            this.props.closeHandler();
        }
    }

    searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        var value: string = e.target.value;
        this.setState({ searchInput: value });
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch(getContact(value));
        }
    }
 
    renderContactList = () => {
        const { contacts } = this.props;
        if (!contacts || contacts.length === 0) {
            return [];
        }
        return contacts.map((contact, index) => {
            return <div key={contact.chatchitId} className="contactItem" onClick={() => {
                const { push, dispatch, closeHandler } = this.props;
                if (push && dispatch) {
                    dispatch(push("/chat/" + contact.chatchitId));
                    closeHandler();
                }
            }} >
                <img alt="avatar" src="https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m" />
                <span className="">{contact.fullname}</span>
            </div>;
        });
    }

    render = () => {
        return <div className="popup" onClick={(e: MouseEvent<HTMLElement>) => this.formClick(e)} >
            <div className="popupMain" >
                <div className="popupHeader">
                    New Chat
            </div>
                <div className="popupSearch">
                    <input type="text" id="searchInput" value={ this.state.searchInput } 
                            onChange = {(e: React.ChangeEvent<HTMLInputElement>,) => this.searchInputChange(e) } 
                            placeholder="Search" />
                </div>
                <div className="popupContent">
                    <h2>Suggestions</h2>
                    <div className="contactList">
                        {this.renderContactList()}
                    </div>
                </div>
            </div>
        </div>;
    }
}

function mapStateToProps(state: any): any {
    return {
        contacts: state.contacts.contacts
    };
}

function mapDispatchToProps(dispatch: Dispatch): any {
    return { dispatch, push };
}

const Popup = connect(mapStateToProps, mapDispatchToProps)(PopupComponent);
export default Popup;