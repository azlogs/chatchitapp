import React from 'react';
import './welcome.css';

interface WelcomeProps {
    StartConversationHandler: () => void //event: React.MouseEvent<HTMLButtonElement>
} 

export default class Welcome extends React.Component<WelcomeProps>{
    render = ()=>{
        return <div className="welcome">
                <div className="welcomeContent">
                    <h2>Welcome, Phuc</h2>

                    <div className="avatar">
                        <img alt="avatar" src="https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m" />
                        <span className="status"></span>
                    </div>
                    
                    <input className="myStatus" type="text" defaultValue="Anything that can wrong, will go wrong"/>
                    <button className="startConversation" onClick = {this.props.StartConversationHandler} >Start a conversation</button> 
                    <label>Search for someone start to charting or go to contracts to see who is available.</label>
                    <label>You are signed in as  phamphuc75.</label>
                    <label>Try to swicth account if you do not see your contacts for conversation history.</label>
                    <a href="https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m" >Learn more</a>
                </div>
            </div>;
    } 
}