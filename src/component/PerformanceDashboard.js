import React from "react";
import axios from "axios/index";
import Toast from "light-toast/dist/index";
import PopOverModal from "./PopOverModal.js"

class PerformanceDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            comment: '',
            empListForFeedback: [],
            empListOfSentFeedback: [],
            showFeedbackModal: false,
            selectedEmpName: '',
            selectedEmpId: ''
        };
        this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.submitFeedback = this.submitFeedback.bind(this);
        this.handleFeedbackModal = this.handleFeedbackModal.bind(this);
        this.getTeamList = this.getTeamList.bind(this);
    };

    handleFeedbackChange = e => {
        this.setState({ comment: e.target.value });
    };
    handleRatingChange = e => {
        this.setState({ rating: e.target.value });
    };

    modalFeedbackClose() {
        this.setState({
            comment: '',
            rating: '',
            showFeedbackModal: false
        });
    }

    submitFeedback = () => {
        if(this.state.comment.length > 0 && this.state.rating !== '' ) {
            const url = 'http://localhost:3000/add_review',
                data = JSON.stringify({ name: this.state.selectedEmpName, id: this.state.selectedEmpId, provider: this.props.LoggedInUser.name+'-'+this.props.LoggedInUser.id, feedback: { comment: this.state.comment, rating: this.state.rating} });
            axios.post(url, data)
                .then(response => {
                    if(response.data.status === 'success') {
                        console.log(response.data);
                        if(response.data.message && response.data.message.length > 0) {
                            Toast.fail(response.data.message +' for '+ response.data.feedback.name, 2000);
                        }
                        else {
                            this.setState({ empListOfSentFeedback: response.data.review.map(item => item.id) });
                            Toast.success(`Performance feedback is submitted for ${this.state.selectedEmpName}`, 2000);
                        }
                        this.modalFeedbackClose();
                    }
                    else {
                        Toast.fail(response.data.message, 2000);
                    }
                }).catch(error => {
                console.error('Something went wrong!', error);
                Toast.fail('Form submit error', 2000);
            });
        }
    };


    handleFeedbackModal = (emp, isFeedbackSend) => {
        !isFeedbackSend && this.setState({ showFeedbackModal: true, selectedEmpName: emp.name, selectedEmpId: emp.id})
    };

    getTeamList() {
        const url = `http://localhost:3000/team_group?team=${this.props.LoggedInUser.team}`;
        axios.get(url)
            .then(response => {
                if(response.data.status === 'success') {
                    console.log(response);
                    const pendingFeedback = response.data.teams.employees.filter(item => item.id !== this.props.LoggedInUser.id);
                    this.setState({ empListForFeedback: pendingFeedback });
                }
                else {
                    Toast.fail(response.data.message, 2000);
                }
            }).catch(error => {
            console.error('Something went wrong getting id!', error);
            Toast.fail('Something went wrong getting id', 2000);
        });
    }
    componentDidMount() {

        const url = 'http://localhost:3000/review?provider='+this.props.LoggedInUser.name+'-'+this.props.LoggedInUser.id;
        axios.get(url)
            .then(response => {
                if(response.data.status === 'success') {
                    console.log(response);
                    // const pendingFeedback = response.data.teams.employees.filter(item => item.id !== this.props.LoggedInUser.id);
                    this.setState({ empListOfSentFeedback: response.data.review.map(item => item.id) });
                    this.getTeamList();
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
        const { rating, comment, empListForFeedback, showFeedbackModal, selectedEmpName, empListOfSentFeedback} = this.state;
        const { LoggedInUser} = this.props;
        const renderEmpList = empListForFeedback
            .map((item, index) => {
                const isFeedbackSend = empListOfSentFeedback.indexOf(item.id)>=0;
                return (
                    <tr className={isFeedbackSend ? 'disable-notification' : ''} key={'message-'+index}>
                        {<td><i className={isFeedbackSend ? 'disable-notification fa fa-bell ' : 'alert-notification fa fa-bell '} title={isFeedbackSend ? 'feedback send' : 'feedback pending'}></i></td>}
                        <td>{item.name}</td>
                        <td>{item.id}</td>
                        <td>{LoggedInUser.team}</td>
                        <td><i className="fa fa-paper-plane fa-2x icon-button" title='send feedback' aria-hidden="true" onClick={()=>this.handleFeedbackModal(item, isFeedbackSend)}></i></td>
                    </tr>
                )
            });

        return (
          <React.Fragment>
              <div className="row">
                  <div className='heading'><h4 className="">Welcome to Performance feedback dashboard</h4></div>
              </div>

              <div className="row">
                  <div className='heading'><h5 className="">Pending review for below list of employees</h5></div>
                  <div className='menu-item-section '>
                      <span className="separator">Pending feedback: <i className='alert-notification fa fa-bell '></i></span>&nbsp;
                      <span className="">Sent feedback: <i className='disable-notification fa fa-bell '></i></span>
                  </div>
              </div>

              {<div className="row table-block">
                  <table className="table table-hover table-dark">
                      <thead>
                      <tr>
                          <th scope="col"></th>
                          <th scope="col">Employee Name</th>
                          <th scope="col">Employee Id</th>
                          <th scope="col">Team</th>
                          <th scope="col"></th>
                      </tr>
                      </thead>
                      <tbody>
                      {renderEmpList}
                      </tbody>
                  </table>
              </div>}
              <PopOverModal show={showFeedbackModal} handleClose={e => this.modalClose(e)} >
                  <div className="modal-head"><h4>Add performance feedback for {selectedEmpName}</h4></div>
                  <div className="form-group">
                      <div className="modal-field">
                          <textarea  placeholder="enter feedback" className="form-control" value={comment} onChange={this.handleFeedbackChange} />
                      </div>

                      <div className="modal-field">
                          <select className="form-control" value={rating} name="role" onChange={this.handleRatingChange}>
                              <option value="">select rating</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                          </select>
                      </div>

                      <div className="modal-field">
                          <button onClick={e => this.submitFeedback()} type="button" className="btn btn-primary" >Submit Feedback</button>
                      </div>
                  </div>
              </PopOverModal>
          </React.Fragment>
        );
    }
}
export default PerformanceDashboard;