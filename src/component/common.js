const baseUrl = 'http://localhost:3000';

// common js file to serve all modules common features
const common = {

    loginUserDetails: 'loginUserDetails', urls: {
        login: baseUrl + '/login',
        team_group: baseUrl + '/team_group?team=',
        add_group: baseUrl + '/add_group',
        add_review: baseUrl + '/add_review',
        reviewProvider: baseUrl + '/review?provider=',
        delete_employee: baseUrl + '/delete_employee',
        get_last_id: baseUrl + '/last-id',
        update_employee: baseUrl + '/update_employee',
        add_employee: baseUrl + '/add_employee',
        review: baseUrl + '/review',
        getEmployees: baseUrl + '/employees'
    }, dashboardOptions: [{
        name: "Employee dashboard", icon: "fa fa-user-circle fa-4x", description: "Add / remove / update / view employees", role: "admin", link: "/emp-dashboard"
    }, {
        name: "Reviews dashboard", icon: "fa fa-check-circle fa-4x", description: "View list of performance reviews", role: "admin", link: "/review"
    }, {
        name: "Assign employees", icon: "fa fa-handshake-o fa-4x", description: "Assign employees for performance review", role: "admin", link: "/assign"
    }, {
        name: "Performance feedback", icon: "fa fa-star fa-4x", description: "Performance reviews requiring feedback", role: "employee", link: "/performance"
    }]
};

export default common;