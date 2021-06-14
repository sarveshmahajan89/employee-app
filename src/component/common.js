import Toast from "light-toast/dist/index";
import $ from 'jquery';
import axios from "axios/index";

const baseUrl = 'http://localhost:3000';


const common = {

    urls : {
        login: baseUrl+'/login',
        team_group: baseUrl+'/team_group?team=',
        add_group: baseUrl+'/add_group',
        add_review: baseUrl+'/add_review',
        team_group: baseUrl+'/team_group?team=',
        reviewProvider: baseUrl+'/review?provider=',
        delete_employee: baseUrl+'/delete_employee',
        get_last_id: baseUrl+'/last-id',
        update_employee: baseUrl+'/update_employee',
        add_employee: baseUrl+'/add_employee',
        review: baseUrl+'/review',
        getEmployees: baseUrl+'/employees'
    },
    // _getRequest:  (url) => {
    //     let d = $.Deferred();
    //
    //     axios.get(url)
    //         .done(response => {
    //             d.resolve.bind(d)
    //         }).catch(error => {
    //         console.error('Something went wrong!', error);
    //         Toast.fail('Form submit error', 2000);
    //     });
    //
    //     return d.promise();
    // }
};

export default common;