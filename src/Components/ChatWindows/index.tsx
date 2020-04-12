import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faVideo, faPhone, faUserPlus,
    faInfoCircle, faSmile, faPhotoVideo, faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import './chat.css';
import { chatWindows } from '../../Redux/Actions';

interface ChatWindowsProps {
    dispatch?: Dispatch,
    chatWindow?: any, 
    computedMatch?: any
}

class ChatWindowsComponent extends React.Component<ChatWindowsProps>{
    state = {
        chatInput: "",
        chatTo: {
            chatchitId:""
        }
    }

    componentDidMount = () => {
        const { dispatch, computedMatch } = this.props;
        if (dispatch && computedMatch) {
            // get contact info
            const chatchitId = computedMatch.params['chatchitId'];
            dispatch(chatWindows.getHistories(chatchitId));
            dispatch(chatWindows.getContactInfo(chatchitId));

            this.setState({
                chatTo:{
                    chatchitId: chatchitId
                }
            });
        }
    }
  
    componentDidUpdate() {
        const { dispatch, computedMatch } = this.props;
        if (dispatch && computedMatch) {
            // get contact info
            const chatchitId = computedMatch.params['chatchitId'];
            if (chatchitId !== this.state.chatTo.chatchitId){ 
                dispatch(chatWindows.getHistories(this.state.chatTo.chatchitId));
                dispatch(chatWindows.getContactInfo(chatchitId));
                this.setState({
                    chatTo:{
                        chatchitId:chatchitId
                    }
                });
            }
        }
        if (document.getElementsByClassName("chatContent").length > 0)
        {
            var chatContent = document.getElementsByClassName("chatContent")[0];
            chatContent.scrollTo(0, chatContent.scrollHeight);
            var chatInput = document.getElementById("chatInput");
            chatInput?.focus();
        }
    }
    
    sendMessage = () => {
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch(chatWindows.sendaMessage(this.state.chatInput,"phamphuc75", "contact1"));
            this.setState({
                chatInput: ""
            });
        }
    }

    inputKeyUpHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && this.state.chatInput !== "") {
            this.sendMessage();
        }
    }

    chatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var value: string = e.target.value;
        this.setState({
            chatInput: value
        });
    }

    renderHistories = () => {
        const { chatWindow } = this.props;
        const currentId = "phamphuc75";
        let continuous = false;
        let lastUser = "";

        if (!chatWindow || !chatWindow.chatHistories || chatWindow.chatHistories.length === 0) return [];
        return chatWindow.chatHistories.map((history: any, index: number) => {
            if (lastUser === history.chatchitId) {
                continuous = true;
            } else {
                continuous = false;
            }
            if (!continuous) lastUser = history.chatchitId;

            let classname = "";
            if (history.chatchitId === currentId) classname = "activeUser";
            return (<div key={index} className="chatItem">
                {
                    (classname === "" && !continuous ?
                        <p style={{ padding: 0, margin: 0, fontWeight: "bold", fontSize: "8" }} >
                            {history.chatchitId}, {history.message.dateSent}
                        </p>
                        : null)
                }
                {
                    (classname === "activeUser" && !continuous ?
                        <p style={{ padding: 0, margin: 0, fontWeight: "bold", fontSize: "8", textAlign: "end" }}>
                            {history.message.dateSent}
                        </p>
                        : null)
                }

                <span className={classname} >{history.message.value}</span>
            </div>);
        });
    }

    render = () => {
        const { chatWindow } = this.props;
        if (!chatWindow || !chatWindow.contactInfo) return null;

        return <div className="chatWindow">
            <div className="chatHeader">
                <div className="chatActivity">
                    <div className="videoCall">
                        <FontAwesomeIcon icon={faVideo} />
                    </div>

                    <div className="voiceCall">
                        <FontAwesomeIcon icon={faPhone} />
                    </div>

                    <div className="chatAddfriend">
                        <FontAwesomeIcon icon={faUserPlus} />
                    </div>
                </div>

                <div className="chatName">
                    <span>{chatWindow.contactInfo.fullname}</span>
                </div>

                <div className="chatInfomation">
                    <div className="numberOfParticipant">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                </div>
            </div>

            <div className="chatContent">
                <div className="chatHistories">
                    {this.renderHistories()}
                </div>
            </div>

            <div className="chatFooter">
                <div className="chatFooterContent">
                    <div className="chatEmoji">
                        <FontAwesomeIcon icon={faSmile} />
                    </div>
                    <div className="chatInput">
                        <input type="text" id="chatInput" placeholder="Type a message"
                            value={this.state.chatInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>, ) => this.chatInputChange(e)}
                            onKeyUp={(e: React.KeyboardEvent) => this.inputKeyUpHandler(e)} />
                    </div>
                    <div className="chatSend">
                        <FontAwesomeIcon onClick={this.sendMessage} icon={faPaperPlane} />
                    </div>
                    <div className="chatMedia">
                        <FontAwesomeIcon icon={faPhotoVideo} />
                    </div>
                </div>
            </div>
        </div>;
    }
}

function mapStateToProps(state: any): any {
    return {
        chatWindow: state.chatWindow
    }
}

function mapDispatchToProps(dispatch: Dispatch): any {
    return { dispatch };
}

const ChatWindows = connect(mapStateToProps, mapDispatchToProps)(ChatWindowsComponent);
export default ChatWindows;