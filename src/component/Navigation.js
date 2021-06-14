import React from "react";
import { Link, useHistory  } from 'react-router-dom';
import $ from 'jquery';
class Navigation  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenuOption: false,
            showUserMenuOptions: false
        };
        this.updateMenuOption = this.updateMenuOption.bind(this);
        this.toggleUserMenuOptions = this.toggleUserMenuOptions.bind(this);
        this.signOut = this.signOut.bind(this);

    }

    updateMenuOption = (e) => {
        // show menu options for small screens size
        this.setState(prevState => ({
            showMenuOption: !prevState.showMenuOption
        }));
    };
    toggleUserMenuOptions = (e) => {
        // show menu options for small screens size
        this.setState(prevState => ({
            showUserMenuOptions: !prevState.showUserMenuOptions
        }));
        // this.isActive()
    };
    // isActive = (viewLocation) => {
    //     let history = useHistory();
    //     console.log(history);
    //     // return viewLocation === $location.path();
    // };
    signOut = (e) => {
        this.toggleUserMenuOptions();
        this.props.signOut();
    };
    render() {
        const { isUserLoggedIn, LoggedInUser} = this.props;
        const { showUserMenuOptions} = this.state;
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container">
                          <span className='icon-image'>
                              <Link to="/"  className="navbar-brand js-scroll-trigger">
                                  <img id="icon"  src="./images/employee-app.png" alt="icon" /> <span className="brand-name">Employee App</span>
                              </Link>
                          </span>
                        <button onClick={this.updateMenuOption} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fa fa-bars"></i>
                        </button>
                        {isUserLoggedIn &&
                        <React.Fragment>
                            <div onClick={this.updateMenuOption} className={this.state.showMenuOption ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link js-scroll-trigger">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/about" className="nav-link js-scroll-trigger" >About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact" className="nav-link js-scroll-trigger">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='user-section' >
                                <span>
                                    <a data-toggle="popover" onMouseOver={this.toggleUserMenuOptions}><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i></a>
                                </span>
                                {showUserMenuOptions && <ul className="menu-option" onMouseLeave={this.toggleUserMenuOptions}>
                                    <li>
                                        Signed in as {LoggedInUser.name}
                                    </li>

                                    <li className="separator"></li>
                                    <li onClick={this.signOut}>
                                        Sign out
                                    </li>
                                </ul>}
                            </div>
                        </React.Fragment>
                        }
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navigation;
