import React from "react";
import Toast from "light-toast/dist/index";
import axios from "axios/index";
import common from "./common";

class ReviewsDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList: []
        };
    };

    componentDidMount() {
        // getting list of all the reviews to show in admin table
        const url = common.urls.review;
        axios.get(url)
            .then(response => {
                if (response.data.status === 'success') {
                    this.setState({reviewList: response.data.review});
                }
                else {
                    Toast.fail(response.data.message, 2000);
                }
            })
            .catch(error => {
                console.error('Something went wrong getting id!', error);
                Toast.fail('Something went wrong getting id', 2000);
            });
    }

    render() {
        const {reviewList} = this.state;
        const renderEmpList = reviewList
            .map((item, index) => {
                return (<tr key={'message-' + index}>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                    <td>{item.provider.split('-')[0]}</td>
                    <td>{item.feedback.comment}</td>
                    <td>{item.feedback.rating}</td>
                </tr>)
            });
        return (<React.Fragment>
            <div className="row">
                <div className='heading'><h4 className="">Welcome to performance review dashboard</h4></div>
            </div>
            <div className="row">
                <div className='heading'><h5 className="">Performance review submitted for below employees</h5></div>
            </div>
            {reviewList.length > 0 && <div className="row table-block">
                <table className="table table-hover table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Feedback provider</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderEmpList}
                    </tbody>
                </table>
            </div>}
        </React.Fragment>);
    }
}

export default ReviewsDashboard;