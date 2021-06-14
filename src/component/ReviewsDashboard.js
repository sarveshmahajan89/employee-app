import React from "react";
import Toast from "light-toast/dist/index";
import axios from "axios/index";


class ReviewsDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList: []
        };
        // this.loginHandler = this.loginHandler.bind(this);

    };


    componentDidMount() {
        const url = 'http://localhost:3000/review';
        axios.get(url)
            .then(response => {
                if(response.data.status === 'success') {
                    console.log(response);
                    // const pendingFeedback = response.data.teams.employees.filter(item => item.id !== this.props.LoggedInUser.id);
                    this.setState({ reviewList: response.data.review });
                }
                else {
                    Toast.fail(response.data.message, 2000);
                }
            }).catch(error => {
            console.error('Something went wrong getting id!', error);
            Toast.fail('Something went wrong getting id', 2000);
        });
    }
    render() {
        const { reviewList} = this.state;
        const renderEmpList = reviewList
            .map((item, index) => {
                return (
                    <tr key={'message-'+index}>
                        <td>{item.name}</td>
                        <td>{item.id}</td>
                        <td>{item.provider.split('-')[0]}</td>
                        <td>{item.feedback.comment}</td>
                        <td>{item.feedback.rating}</td>
                        <td><i className="fa fa-paper-plane fa-2x icon-button" title='send feedback' aria-hidden="true" ></i></td>
                    </tr>
                )
            });
        return (
          <React.Fragment>
              <div className="row">
                  <div className='heading'><h4 className="">Welcome to performance review dashboard</h4></div>
              </div>
              <div className="row">
                  <div className='heading'><h5 className="">Performance review submitted for below employees</h5></div>
              </div>
              {<div className="row table-block">
                  <table className="table table-hover table-dark">
                      <thead>
                      <tr>
                          <th scope="col">Employee Name</th>
                          <th scope="col">Employee Id</th>
                          <th scope="col">Feedback provider</th>
                          <th scope="col">Comment</th>
                          <th scope="col">Rating</th>
                          <th scope="col"></th>
                      </tr>
                      </thead>
                      <tbody>
                      {renderEmpList}
                      </tbody>
                  </table>
              </div>}
          </React.Fragment>
        );
    }
}
export default ReviewsDashboard;