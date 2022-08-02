const db = require("../config/connection.js");
const inquirer = require('inquirer');

const addDepartment = (callbackStart) => {
    const addDepartmentQuestions = [
        {
            name: "name",
            message: "What is the name of the department you would like to add?"
        }
    ]
    inquirer.prompt(addDepartmentQuestions)
    .then((results) => {
        console.log("Added New Department!", results)
        db.query('INSERT INTO department SET ?', results)
        .then(() => {
            callbackStart();
        })
    })
}

module.exports = addDepartment;