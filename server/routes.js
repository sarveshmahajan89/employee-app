const express = require("express");
const empModel = require("./models");
const teamsModel = require("./teamsModel");
const empReviewModel = require("./empReviewModel");
const app = express();

app.post("/add_group", async (request, response) => {
    // api to add employee grouping to db
    let newTeamModel = request.body, responseObj = {}, teams = await teamsModel.find({}), result;

    try {
        if (teams.filter((item) => item.team === newTeamModel.team).length > 0) {
            result = await teamsModel.updateOne({team: newTeamModel.team}, {$set: {employees: newTeamModel.employees}});
            if (result && result.nModified && Number(result.nModified) >= 0) {
                responseObj.status = "success";
                responseObj.rowModified = result.nModified;
                responseObj.isUpdate = true;
            }
            else {
                responseObj.status = "fail";
                responseObj.message = "error while updating record";
            }
        }
        else {
            const team = new teamsModel(newTeamModel);
            await team.save();
            responseObj.status = 'success';
            responseObj.message = null;
            responseObj.isUpdate = false;
            responseObj.team = newTeamModel.team;
        }

        response.send(responseObj);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
app.get("/team_group", async (request, response) => {
    // api to retrieve team groups that are already created list from db
    const query = request.query.team;
    let teams = await teamsModel.find({}), responseObj = {};
    try {
        teams = query && query.length > 0 ? teams.filter((item) => item.team === query) : teams;
        if (teams && teams.length > 0) {
            responseObj.status = 'success';
            responseObj.message = null;
            responseObj.teams = teams[0];
        }
        else {
            responseObj.status = 'fail';
            responseObj.message = 'Performance review group is pending for selected team';
            responseObj.teams = [];
        }
        response.send(responseObj);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.get("/review", async (request, response) => {
    // get list of all the reviews, or based on query param from db
    const query = request.query.provider, queryObj = (query && query.length > 0) ? {provider: query} : '';

    try {
        let review = queryObj ? await empReviewModel.find(queryObj) : await empReviewModel.find(), responseObj = {};

        if (review && review.length > 0) {
            responseObj.status = 'success';
            responseObj.message = null;
            responseObj.review = review;
        }
        else {
            responseObj.status = 'success';
            responseObj.message = 'no review found';
            responseObj.review = [];
        }
        response.send(responseObj);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
app.post("/add_review", async (request, response) => {
    // add review for selected employee
    let newReview = request.body, responseObj = {};

    try {
        let review = await empReviewModel.find();
        review = review.filter(item => item.id === newReview.id && item.provider === newReview.provider);

        if (review.length > 0) {
            responseObj.status = 'success';
            responseObj.message = 'Feedback already added';
            responseObj.feedback = newReview;
        }
        else {
            const employee = new empReviewModel(newReview);
            await employee.save();
            review = [];
            review = await empReviewModel.find({provider: newReview.provider});
            responseObj.status = 'success';
            responseObj.message = null;
            responseObj.review = review;
        }

        response.send(responseObj);
    }
    catch (error) {
        console.log('catch post call');
        response.status(500).send(error);
    }
});
app.post("/add_employee", async (request, response) => {
    // add new employee to db by admin
    let newUser = request.body, responseObj = {};
    newUser.password = newUser.id;
    const employee = new empModel(newUser);
    try {
        await employee.save();
        const employees = await empModel.find({}, {name: true, role: true, team: true, id: true});
        responseObj.status = 'success';
        responseObj.message = null;
        responseObj.employees = employees;
        response.send(responseObj);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/login", express.json({type: '*/*'}), async (request, response) => {
    // authenticating user id and password for login
    const user = request.body;
    try {
        const employees = await empModel.find({}), loginEmp = employees.filter(emp => emp.id === user.id && emp.password === user.password);
        let responseObj = {};
        if (loginEmp.length <= 0) {
            responseObj.status = 'fail';
            responseObj.message = 'incorrenct user name and password';
            responseObj.user = user.id;
            responseObj.code = 500;
        }
        else {
            responseObj.status = 'success';
            responseObj.message = null;
            responseObj.user = {'name': loginEmp[0].name, 'role': loginEmp[0].role, 'team': loginEmp[0].team, 'id': loginEmp[0].id};
            responseObj.code = 200;
        }
        response.send(JSON.stringify(responseObj));
    }
    catch (error) {
        console.error('login fails');
        response.status(500).send(error);
    }
});

app.get("/employees", async (request, response) => {
    // fetching list of employees from mongodb
    const employees = await empModel.find({}, {name: true, role: true, team: true, id: true});
    try {
        response.send(employees);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
app.get("/next-id", async (request, response) => {
    // passing next id for creating new user
    let lastAddedEmployee = await empModel.find().limit(1).sort({$natural: -1}), nextId;
    if (lastAddedEmployee.length > 0) {
        const lastAddedEmployeeId = lastAddedEmployee[0].id.split('-');
        nextId = lastAddedEmployeeId[0] + '-' + (Number(lastAddedEmployeeId[1]) + 1)
    }
    try {
        response.send(nextId);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/update_employee", async (request, response) => {
    // query to update user in db
    const user = request.body, result = await empModel.updateOne({id: user.id}, {$set: {name: user.name, role: user.role, team: user.team}});
    let responseObj = {};
    try {
        if (result && result.nModified && Number(result.nModified) >= 0) {
            const employees = await empModel.find({}, {name: true, role: true, team: true, id: true});
            responseObj.status = "success";
            responseObj.rowModified = result.nModified;
            responseObj.employees = employees;
        }
        else {
            responseObj.status = "fail";
            responseObj.rowModified = result.nModified
        }
        response.send(responseObj);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/delete_employee", async (request, response) => {
    // api to delete user from mongodb
    let responseObj = {};
    const user = request.body, result = await empModel.deleteOne({id: user.id}, (err, obj) => {
        if (err) {
            throw err;
            responseObj.status = 'fail'
        }
        responseObj.status = "success";
    });
    const employees = await empModel.find({}, {name: true, role: true, team: true, id: true});
    responseObj.employees = employees;
    response.send(responseObj);
});

module.exports = app;