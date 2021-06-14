import React from "react";
import {Link} from 'react-router-dom';
import common from "./common";

class Home extends React.Component {
    // Home component shows list of dashboard based on role
    render() {
        const {LoggedInUser} = this.props;
        return (<React.Fragment>
            <div className="row">
                <div className='heading'><h4 className="">Welcome {LoggedInUser.name}</h4></div>
            </div>

            <div className="row">
                {common.dashboardOptions.map((item, index) => {
                    return (LoggedInUser.role === item.role && <div key={`option-${index}`} className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <Link to={item.link} className="nav-link js-scroll-trigger">
                            <div className="user-option-block">
                                <div>
                                    <div className="option-section">
                                        <i className={item.icon} title='performance feedback' aria-hidden="true"></i>
                                    </div>
                                    <div className="option-section">
                                        <h5>{item.name}</h5>
                                    </div>
                                    <div className="option-section">
                                        <h6>{item.description}</h6>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>)
                })}
            </div>
        </React.Fragment>);
    }
}

export default Home;