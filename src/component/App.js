import React from "react";
import "./App.scss";
import Footer from "./Footer.js"
import Navigation from "./Navigation.js"
import Router from "./Router.js"
import Login from "./Login.js"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false,
            userName: '',
            LoggedInUser: {}
        };
        this.loginHandler = this.loginHandler.bind(this);
        this.signOut = this.signOut.bind(this);
    };

    loginHandler = (user) => {
        this.setState({ isUserLoggedIn: true, LoggedInUser: user});

    };
    signOut = (user) => {
        this.setState({ isUserLoggedIn: false, userName: ''});
        sessionStorage.setItem('userDetails', '');
    };
    componentDidMount() {
        let userDetail = sessionStorage.getItem('userDetails');
        userDetail = userDetail ? JSON.parse(userDetail) : '';
        console.log(userDetail);
        if(userDetail.hasOwnProperty('name') && userDetail.hasOwnProperty('role')) {
            this.loginHandler(userDetail);
        }
    }
    render() {
        const { isUserLoggedIn, LoggedInUser} = this.state;
        return (
          <div>
              <Navigation isUserLoggedIn={isUserLoggedIn} LoggedInUser={LoggedInUser} signOut={this.signOut}/>
              {isUserLoggedIn && <Router LoggedInUser={LoggedInUser} />}
              {!isUserLoggedIn && <Login loginHandler={this.loginHandler}/>}
              <Footer />
          </div>
        );
    }
}

export default App;