import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { leftSide } from '../../Redux/Actions';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faVideo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { Link } from "react-router-dom";
import { getUser } from '../../Common';
import './sidebar.css';


interface SidebarProps {
    sidebar?: Sidebar,
    StartConversationHandler: () => void,
    dispatch?: Dispatch,
    activeUser?: any,
    push?: any
};

class SideBarComponent extends React.Component<SidebarProps> { 

    componentDidMount() {
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch(leftSide.getContact(""));
        }
    }

    renderContactList = () => {
        let props = this.props;

        if (!props.sidebar || !props.sidebar.contacts || props.sidebar.contacts.length === 0) {
            return [];
        }

        return props.sidebar.contacts.map((contact, index) => {
            return <div key={contact.chatchitId} className="contactItem" onClick={() => {
                const { push, dispatch } = this.props;
                if (push && dispatch) {
                    dispatch(push("/chat/" + contact.chatchitId));
                }
            }}>
                <img alt="avatar" src={contact.avatar}></img>
                <div className="contactInfo">
                    <span>{contact.fullname}</span>
                    <span>{contact.lastMessage.message.substr(0, 40)}</span>
                </div>
                <span className="lastSentMessage">
                    {contact.lastMessage.dateSent}
                </span>
            </div>
        });
    } 

    render = () => {
        var activeUser = getUser();
        if (!activeUser || activeUser === {}) return null;

        return <div className="sideBar">

            <div className="profile">
                <div className="imgCircle">
                    <img alt="avatar" src={activeUser.avatar}></img>
                </div>

                <div className="account">
                    <span> <Link to="/home"> {activeUser.fullname} ( {activeUser.nickname} )</Link></span>
                    <span>{activeUser.status} </span>
                </div>

                <div className="setting">
                    <FontAwesomeIcon icon={faEllipsisH} onClick={() =>{
                        var menu = document.getElementById("settingMenu");
                        if (menu)
                        {
                            if (menu.style.display === "block")
                            {
                                menu.style.display = "none";
                            }
                            else {
                                menu.style.display = "block";
                            }
                        } 
                    }} />
                    <ul id="settingMenu" className="settingMenu">
                        <li><a href={window.location.origin +"/logout"} >Logout</a></li>
                    </ul>
                </div>
            </div>


            <div className="search">
                <input placeholder="People, groups and messages"></input>
            </div>

            <div className="conversation">
                <div className="newMeetup">
                    <FontAwesomeIcon icon={faVideo} />
                    <span>Meetup now</span>
                </div>

                <div className="newChat" onClick={() => {
                    if (this.props.StartConversationHandler)
                        this.props.StartConversationHandler();
                }} >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Chat now</span>
                </div>
            </div>

            <div className="contacts">
                <span className="title">Contacts</span>
                <div className="contactList" >
                    {this.renderContactList()}
                </div>
            </div>
        </div>;
    }
}

function mapStateToProps(state: any): any {
    return {
        sidebar: state.leftSide,
        activeUser: state.authorize.userProfile
    };
}

function mapDispatchToProps(dispatch: Dispatch): any {
    return { dispatch, push };
}

const SideBar = connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);
export default SideBar;