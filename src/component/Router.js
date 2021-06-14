import React from "react";
import Home from "./Home.js"
import About from "./About.js"
import EmployeeDashboard from "./EmployeeDashboard.js"
import ReviewsDashboard from "./ReviewsDashboard.js"
import AssignEmployeeDashboard from "./AssignEmployeeDashboard.js"
import PerformanceDashboard from "./PerformanceDashboard.js"
import Contact from "./Contact.js"
import common from "./common";
import {Switch, Route} from 'react-router-dom';
import axios from "axios/index";
import Toast from "light-toast/dist/index";

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false, employeeList: []
        };
        this.updateEmployeeList = this.updateEmployeeList.bind(this);
    };

    updateEmployeeList(employees) {
        this.setState({employeeList: employees});
    }

    componentDidMount() {
        // fetching list of employees that need to pass into child components
        const url = common.urls.getEmployees;
        axios.get(url)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({employeeList: response.data});
                }
                else {
                    Toast.fail(response.data.message, 2000);
                }
            })
            .catch(error => {
                console.error('Something went wrong!', error);
                Toast.fail('Form submit error', 2000);
            });
    }

    render() {
        const {LoggedInUser} = this.props;
        const {employeeList} = this.state;
        return (<header className="masthead">
                <div className="container">
                    <div>
                        <div className="content">
                            <Switch>
                                <Route exact path="/" render={(history) => (<Home LoggedInUser={LoggedInUser}/>)}/>
                                <Route path='/about' component={About}/>
                                <Route path='/contact' component={Contact}/>
                                {LoggedInUser.role === 'admin' && <React.Fragment> <Route path='/emp-dashboard' render={() => (
                                    <EmployeeDashboard employeeList={employeeList} updateEmployeeList={this.updateEmployeeList}/>)}/>
                                    <Route path='/review' component={ReviewsDashboard}/>
                                    <Route path='/assign' render={() => (<AssignEmployeeDashboard employeeList={employeeList}/>)}/>
                                </React.Fragment>}
                                {LoggedInUser.role === 'employee' && <Route path='/performance' render={() => (<PerformanceDashboard LoggedInUser={LoggedInUser}/>)}/>}
                            </Switch>
                        </div>
                    </div>
                </div>
            </header>);
    }
}

export default Router;