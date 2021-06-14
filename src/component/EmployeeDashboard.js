import React from "react";
import axios from "axios/index";
import Toast from "light-toast/dist/index";
import PopOverModal from "./PopOverModal.js"
import common from "./common";

class EmployeeDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '', role: '', team: '', empId: '', showAddUserModal: false, isEditMode: false, showConfirmModal: false
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.addUpdateUser = this.addUpdateUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.editUser = this.editUser.bind(this);
        this.showAddUserModal = this.showAddUserModal.bind(this);
        this.enableAddEmpButton = this.enableAddEmpButton.bind(this);
    };

    handleNameChange = e => {
        this.setState({userName: e.target.value});
    };
    handleRoleChange = e => {
        const team = e.target.value === 'admin' ? e.target.value : this.state.team;
        this.setState({role: e.target.value, team});
    };
    handleTeamChange = e => {
        this.setState({team: e.target.value});
    };
    handleIdChange = e => {
        this.setState({empId: e.target.value});
    };
    editUser = (item) => {
        this.setState({showAddUserModal: true, userName: item.name, role: item.role, team: item.team, empId: item.id, isEditMode: true});
    };
    confirmDelete = (item) => {
        this.setState({userName: item.name, empId: item.id, showConfirmModal: true});
    };
    removeUser = (e) => {
        // method for removing selected user from db
        const url = common.urls.delete_employee, data = JSON.stringify({name: this.state.userName, id: this.state.empId});
        axios.post(url, data)
            .then(response => {
                if (response.data.status === 'success') {
                    Toast.success(this.state.userName + ' user data is deleted', 2000);
                    this.modalConfirmClose();
                    this.setState({userName: '', role: '', team: '', empId: ''});
                    this.props.updateEmployeeList(response.data.employees);
                }
                else {
                    Toast.fail(response.data.message, 2000);
                    this.props.updateEmployeeList(response.data.employees);
                }
            })
            .catch(error => {
                console.error('Something went wrong!', error);
                Toast.fail('Form submit error', 2000);
            });
    };
    showAddUserModal = (e) => {
        // showing add user modal dialog and getting latest id for new user, as id is non editable field
        this.setState({showAddUserModal: true, isEditMode: false}, () => {
            const url = common.urls.get_last_id;
            axios.get(url)
                .then(response => {
                    if (response.data.length > 0) {
                        this.setState({empId: response.data});
                    }
                    else {
                        Toast.fail(response.data.message, 2000);
                    }
                })
                .catch(error => {
                    console.error('Something went wrong getting id!', error);
                    Toast.fail('Something went wrong getting id', 2000);
                });
        });
    };

    enableAddEmpButton = (e) => {
        return this.state.userName.length > 0 && (this.state.role && this.state.role !== 'select role');
    };
    addUpdateUser = (e) => {
        // showing and/update modla dialogue, and  saving new user or updating from modal dialog submit
        if (this.state.userName.length > 0 && this.state.role !== '' && this.state.team !== '') {

            if (this.state.isEditMode) {
                const url = common.urls.update_employee, data = JSON.stringify({name: this.state.userName, id: this.state.empId, role: this.state.role, team: this.state.team});

                axios.post(url, data)
                    .then(response => {
                        if (response.data.status === 'success') {
                            Toast.success(this.state.userName + ' user data is updated', 2000);
                            this.modalClose();
                            this.setState({userName: '', role: '', team: '', empId: ''});
                            this.props.updateEmployeeList(response.data.employees)
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
            else {
                const url = common.urls.add_employee, data = JSON.stringify({name: this.state.userName, id: this.state.empId, role: this.state.role, team: this.state.team});
                axios.post(url, data)
                    .then(response => {
                        if (response.data.status === 'success') {
                            Toast.success(this.state.userName + ' user is added', 2000);
                            this.modalClose();
                            this.setState({userName: '', role: '', team: '', empId: ''});
                            this.props.updateEmployeeList(response.data.employees)
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
        }

    };

    modalClose() {
        this.setState({
            userName: "", role: "", team: "", showAddUserModal: false
        });
    }

    modalConfirmClose() {
        this.setState({
            userName: '', showConfirmModal: false
        });
    }

    render() {
        const {employeeList} = this.props;
        const {userName, role, empId, showAddUserModal, isEditMode, showConfirmModal, team} = this.state;
        const renderEmpList = employeeList
            .map((item, index) => {
                return (<tr className="" key={'message-' + index}>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                    <td>{item.team}</td>
                    <td>{item.id}</td>
                    <td>< i className="fa fa-pencil-square-o fa-2x icon-button" title='edit user' aria-hidden="true" onClick={() => this.editUser(item)}></i></td>
                    <td>< i className="fa fa-trash-o fa-2x icon-button" title='remove user' aria-hidden="true" onClick={() => this.confirmDelete(item)}></i></td>
                </tr>)
            });
        return (<React.Fragment>
            <div className="row">
                <div className='heading'><h4 className="">Welcome to Employees dashboard</h4></div>
            </div>

            <div className="row">
                <div className="menu-item-section btn-toolbar" role="toolbar">
                    <div className="menu-item btn-group">
                        <button type="button" className="btn btn-primary" onClick={() => this.showAddUserModal()}>
                            < i className="fa fa-user-plus icon-menu" title='Add employee' aria-hidden="true"></i>
                            Add employee
                        </button>
                    </div>
                </div>
            </div>

            {employeeList.length > 0 && <div className="row table-block">
                <table className="table table-hover table-dark">
                    <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Team</th>
                        <th scope="col">ID</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderEmpList}
                    </tbody>
                </table>
            </div>}
            <PopOverModal show={showAddUserModal} handleClose={e => this.modalClose(e)}>
                <div className="modal-head"><h4>{isEditMode ? <span>Edit</span> : <span>Add new</span>} employee</h4></div>
                <div className="form-group">
                    <div className="modal-field">
                        <input type="text" placeholder="enter name" className="form-control" value={userName} onChange={this.handleNameChange}/>
                    </div>

                    <div className="modal-field">
                        <select className="form-control" value={role} name="role" onChange={this.handleRoleChange}>
                            <option value="">select role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                            <option value="contractor">Contractor</option>
                        </select>
                    </div>
                    {(role !== '' && role !== 'admin') && <div className="modal-field">
                        <select className="form-control" value={team} name="team" onChange={this.handleTeamChange}>
                            <option value="">select team</option>
                            <option value="product">Product Team</option>
                            <option value="hr">HR Team</option>
                            <option value="sales">Sales Team</option>
                        </select>
                    </div>}
                    <div className="modal-field">
                        <input type="text" placeholder="enter id" className="form-control" value={empId} disabled="disabled" onChange={this.handleIdChange}/>
                    </div>
                    <div className="modal-field">
                        <button onClick={e => this.addUpdateUser(e)} type="button" className="btn btn-primary" disabled={!this.enableAddEmpButton}>{isEditMode ?
                            <span>Update</span> : <span>Add</span>} employee
                        </button>
                    </div>
                </div>
            </PopOverModal>
            <PopOverModal show={showConfirmModal} handleClose={e => this.modalConfirmClose(e)}>
                <div className="modal-head"><h4>Confirm delete !</h4></div>
                <div className="form-group">
                    <div>
                        <h6>Are you sure you want to delete {userName} user details ?</h6>
                    </div>
                    <div className="modal-field">
                        <button onClick={e => this.removeUser(e)} type="button" className="btn btn-primary">Delete employee</button>
                    </div>
                </div>
            </PopOverModal>
        </React.Fragment>);
    }
}

export default EmployeeDashboard;