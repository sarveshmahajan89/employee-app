import React from "react";
import axios from "axios/index";
import Toast from "light-toast/dist/index";
import PopOverModal from "./PopOverModal.js"
import common from "./common";

class AssignEmployeeDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxObj: {},
            team: '',
            selectedEmp: [],
            showConfirmModal: false
        };
        this.empSelection = this.empSelection.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.confirmModal = this.confirmModal.bind(this);

    };

    empSelection = (id) => {
        this.setState({
            checkBoxObj: {
                ...this.state.checkBoxObj, ...{[id]: this.state.checkBoxObj[id]}
            }
        })
    };
    handleTeamChange = e => {
        this.setState({ team: e.target.value, checkBoxObj: {} });
        const url = common.urls.team_group+e.target.value;
        axios.get(url)
            .then(response => {
                if(response.data.status === 'success') {
                    console.log(response);
                    this.setState({ selectedEmp: response.data.teams.employees });
                }
                else {
                    Toast.fail(response.data.message, 2000);
                }
            }).catch(error => {
            console.error('Something went wrong getting id!', error);
            Toast.fail('Something went wrong getting id', 2000);
        });

    };
    confirmModal = () => {
        (this.state.team && this.state.team !== '') && this.setState({showConfirmModal: true });
    };
    modalConfirmClose() {
        this.setState({
            showConfirmModal: false
        });
    }

    addGroup = (e) => {
        if (this.state.team && this.state.team !== '') {
            let selectedTeam = this.props.employeeList.filter((item) => item.team === this.state.team),
                empGroupList = [];
            selectedTeam.map(item => {
                empGroupList.push({id: item.id, name: item.name});
            });
            console.log(empGroupList);
            const url = common.urls.add_group,
                data = JSON.stringify({ team: this.state.team, employees: empGroupList, active: true });
            axios.post(url, data)
                .then(response => {
                    if(response.data.status === 'success') {
                        console.log(response.data);
                        Toast.success(`Employee group for performance review is ${response.data.isUpdate ? 'updated ' : 'created '} for team: ` + this.state.team, 2000);
                        this.modalConfirmClose();
                        this.setState({ team: '', checkBoxObj: {} });
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

    render() {
        const { employeeList} = this.props;
        const { checkBoxObj, showConfirmModal, team} = this.state;
        let teamList = employeeList.length>0 ? (employeeList.map(item => item.team)).filter((v, i, a) =>{ return a.indexOf(v) === i}) : [];
        const renderEmpList = employeeList
            .filter((item) => item.team === team)
            .map((item, index) => {
                return (
                    <tr className="" key={'message-'+index}>
                        <td><input className="selection" type="checkbox" checked={checkBoxObj[item.id] || true} onChange={() => this.empSelection(item.id)} /></td>
                        <td>{item.name}</td>
                        <td>{item.id}</td>
                        <td>{item.team}</td>
                    </tr>
                )
            });

        return (
          <React.Fragment>
              <div className="row">
                  <div className='heading'><h4 className="">Welcome to employee's performance review dashboard</h4></div>
              </div>
              <div className="row">
                  <div className='heading'><h5 className="">All employees for same team will be grouped for performance review</h5></div>
              </div>

              <div className="row">
                  <div className="menu-item-section btn-toolbar" role="toolbar">
                      <div className="menu-item btn-group">
                          <select className="form-control" value={team} name="team" onChange={this.handleTeamChange}>
                              <option value="">select team</option>
                              {teamList.map((item, index) => (
                                  <option key={index} value={item}>{item}</option>
                              ))}
                            </select>
                      </div>
                      <div className="menu-item btn-group" >
                          <button type="button" className="btn btn-primary" onClick={this.confirmModal}>
                            < i className="fa fa-handshake-o icon-menu" title='add user' aria-hidden="true" ></i>
                              Add/Update group</button>
                      </div>
                  </div>
              </div>

              {team !== '' && <div className="row table-block">
                  <table className="table table-hover table-dark">
                      <thead>
                      <tr>
                          <th scope="col"></th>
                          <th scope="col">Employee Name</th>
                          <th scope="col">Employee Id</th>
                          <th>Team</th>
                      </tr>
                      </thead>
                      <tbody>
                      {renderEmpList}
                      </tbody>
                  </table>
              </div>}

              <PopOverModal show={showConfirmModal} handleClose={e => this.modalConfirmClose(e)} >
                  <div className="modal-head"><h4>Adding performance review grouping</h4></div>
                  <div className="form-group">
                      <div>
                          <h6>Confirm grouping for team: {team}</h6>
                      </div>
                      <div className="modal-field">
                          <button onClick={e => this.addGroup(e)} type="button" className="btn btn-primary">Add Group</button>
                      </div>
                  </div>
              </PopOverModal>
          </React.Fragment>
        );
    }
}
export default AssignEmployeeDashboard;