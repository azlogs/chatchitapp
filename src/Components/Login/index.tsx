import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { autorize } from '../../Redux/Actions';
import { setUserSession } from '../../Common';
import { push } from 'connected-react-router';
import './login.css';


interface LoginProps {
    dispatch?: Dispatch,
    loginHander: () => void,
    userProfile?: {}, 
    push: any,
    location?: any
}

class LoginComponent extends React.Component<LoginProps> {

    componentDidUpdate(){  
        if (this.props.userProfile)
        {
            setUserSession("token", this.props.userProfile);
            const { dispatch, loginHander } = this.props;
            if (dispatch) {
                loginHander();
                let gobackTo = "/home";
                if (this.props.location && this.props.location.state){
                    gobackTo = this.props.location.state.from;
                }

                if (gobackTo === "/login" || gobackTo === "/logout") {
                    gobackTo = "/home";
                }

                dispatch(push(gobackTo ));
               
            }
        }

        return null;
    }

    login = (e: React.MouseEvent) => {
        const { dispatch } = this.props;
        if (dispatch) {
            var username = this.refs.username as HTMLInputElement;
            var password = this.refs.password as HTMLInputElement;
            dispatch(autorize.login(username.value, password.value));
        }
    }

    render() {  
        return (
            <div className="login">
                <button style={{ width: 'auto' }}
                    onClick={() => {
                        let a = document.getElementById('id01');
                        if (a) a.style.display = 'block';
                    }} >Login</button>

                <div id="id01" className="modal">
                    <form className="modal-content animate">
                        <div className="imgcontainer">
                            <span onClick={() => {
                                let a = document.getElementById('id01');
                                if (a) a.style.display = 'none';
                            }} className="close" title="Close Modal">&times;</span>

                            <img alt="avatar" src="https://avatar.skype.com/v1/avatars/phamphuc75?auth_key=702836744&size=m" />
                        </div>

                        <div className="container">
                            <label><b>Username</b></label>
                            <input type="text" ref="username" autoComplete="username" placeholder="Enter Username" name="uname" required />

                            <label><b>Password</b></label>
                            <input type="password" ref="password" autoComplete="current-password" placeholder="Enter Password" name="psw" required />

                            <button type="button" onClick={this.login}> Login</button>
                            <label>
                                <input type="checkbox" name="remember" /> Remember me
                    </label>
                        </div>

                        <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
                            <button type="button" onClick={() => {
                                let a = document.getElementById('id01');
                                if (a) a.style.display = 'none';
                            }} className="cancelbtn">Cancel</button>
                            <span className="psw">Forgot <a href="http://localhost:3000/">password?</a></span>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any): any {
    return {
        userProfile: state.authorize.userProfile
    };
}

function mapDispatchToProps(dispatch: Dispatch): any {
    return { dispatch, push };
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;