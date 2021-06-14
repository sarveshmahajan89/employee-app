import React from "react";
import Toast from 'light-toast';
import axios from 'axios'
import { Redirect } from "react-router-dom";
import common from "./common";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 'emp-101',
            password: 'emp-101',
            isUserLoggedIn: false
        };
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    };

    handleUserIdChange = e => {
        this.setState({ userId: e.target.value });
    };
    handlePassChange = e => {
        this.setState({ password: e.target.value });
    };

    submitLogin = e => {
        e.preventDefault();
        if(this.state.userId.length<=0 && this.state.password.length<=0) {
            return;
        }

        const url = common.urls.login;
        axios.post(url, JSON.stringify({ id: this.state.userId, password: this.state.password }))
            .then(response => {
                if(response.data.status === 'success') {
                    console.log(response.data.user);
                    sessionStorage.setItem('userDetails', JSON.stringify(response.data.user));
                    this.setState({ isUserLoggedIn: true });
                    this.props.loginHandler(response.data.user);
                    // this.history.push("/");
                }
                else {
                    Toast.fail(response.data.message, 2000);
                }
            }).catch(error => {
                console.error('Something went wrong!', error);
                Toast.fail('Form submit error', 2000);
            });
    };

    render() {
        const { userId, password, isUserLoggedIn} = this.state;
        if(isUserLoggedIn) {
            return <Redirect to="/" />
        }
        return (
            <header className="masthead">
                <div className="container">
                    <div >
                        <div className="content" >
                            <div>
                                <div className="row">
                                    <div className='heading'><h5 className="">Welcome to Employee app, please login to continue</h5></div>
                                </div>
                                <div className="row login-container">
                                    <div className="heading"><h4 className="skills">Login</h4></div>
                                    <form className="login-form" onSubmit={this.submitLogin}>
                                        <div className='container-fields'>
                                            <input className="input-field" id="userid" aria-label="username" placeholder='user name'
                                                   name="id" type="text" value={userId} onChange={this.handleUserIdChange} />
                                        </div>

                                        <div className='container-fields'>
                                            <input className="input-field" id="password" aria-label="password" placeholder='password'
                                                   name="password" type="password" value={password} onChange={this.handlePassChange} />
                                        </div>
                                        <div className='container-fields'>
                                            <div>
                                                <button className='submit-button-field' type="submit" >
                                                    <i className="fa fa-sign-in fa-3x" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
export default Login ;