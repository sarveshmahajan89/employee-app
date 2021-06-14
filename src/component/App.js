import React from "react";
import "../scss/App.scss";
import Footer from "./Footer.js"
import Navigation from "./Navigation.js"
import Router from "./Router.js"
import Login from "./Login.js"
import common from "./common";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false, userName: '', LoggedInUser: {}
        };
        this.loginHandler = this.loginHandler.bind(this);
        this.signOut = this.signOut.bind(this);
    };

    loginHandler = (user) => {
        // handlers login after validation from /login call
        this.setState({isUserLoggedIn: true, LoggedInUser: user});
    };
    signOut = (user) => {
        // handlers sign out
        this.setState({isUserLoggedIn: false, userName: ''});
        sessionStorage.setItem(common.loginUserDetails, '');
    };

    componentDidMount() {
        // handlers login on every refressh by reading details from sessionStorage
        let userDetail = sessionStorage.getItem(common.loginUserDetails);
        userDetail = userDetail ? JSON.parse(userDetail) : '';
        if (userDetail.hasOwnProperty('name') && userDetail.hasOwnProperty('role')) {
            this.loginHandler(userDetail);
        }
    }

    render() {
        const {isUserLoggedIn, LoggedInUser} = this.state;
        return (<div>
                <Navigation isUserLoggedIn={isUserLoggedIn} LoggedInUser={LoggedInUser} signOut={this.signOut}/>
                {isUserLoggedIn && <Router LoggedInUser={LoggedInUser}/>}
                {!isUserLoggedIn && <Login loginHandler={this.loginHandler}/>}
                <Footer/>
            </div>);
    }
}

export default App;