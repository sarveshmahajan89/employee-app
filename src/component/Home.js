import React from "react";
import { Link } from 'react-router-dom';

const dashboardOptions = [
    {
        name: "Employee dashboard",
        icon: "fa fa-user-circle fa-4x",
        description: "Add / remove / update / view employees",
        role: "admin",
        link: "/emp-dashboard"
    },
    {
        name: "Reviews dashboard",
        icon: "fa fa-check-circle fa-4x",
        description: "Add / update / view performance reviews",
        role: "admin",
        link: "/review"
    },
    {
        name: "Assign employees",
        icon: "fa fa-handshake-o fa-4x",
        description: "Assign employees for performance review",
        role: "admin",
        link: "/assign"
    },
    {
        name: "Performance feedback",
        icon: "fa fa-star fa-4x",
        description: "Performance reviews requiring feedback",
        role: "employee",
        link: "/performance"
    }
];
class Home  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };


    render() {
        const {LoggedInUser, employeeList} = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <div className='heading'><h4 className="">Welcome {LoggedInUser.name}</h4></div>
                </div>

                <div className="row">
                    {dashboardOptions.map((item, index) => {
                        return (LoggedInUser.role === item.role && <div key={`option-${index}`} className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <Link to={item.link} className="nav-link js-scroll-trigger" >
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
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}
export default Home ;