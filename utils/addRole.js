const db = require("../config/connection.js");
const inquirer = require('inquirer');

const addRole = (callbackStart) => {
    db.query(`SELECT * FROM department`) // get all departments
    .then((results) => {
        // console.log("results", results)
        const departmentChoices = results.map((department) => {
            return {
                name: department.name,
                value: department.id
            }
        }
        )
        // console.log("departmentChoices", departmentChoices)
        const addRoleQuestions = [
            {
                name: "title",
                message: "What is the title of the role you would like to add?"
            },
            {
                name: "salary",
                message: "What is the salary of the role you would like to add?"
            },
            {
                name: "department_id",
                message: "What is the department id of the role you would like to add?",
                type: "list",
                choices: departmentChoices
            }
        ]
        inquirer.prompt(addRoleQuestions)
        .then((results) => {
            console.log("Added New Role!", results)
            db.query('INSERT INTO role SET ?', results)
            .then(() => {
                callbackStart();
            })
        }
        )
    }
)}

module.exports = addRole;