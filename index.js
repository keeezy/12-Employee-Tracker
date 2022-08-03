const inquirer = require("inquirer");
const db = require("./config/connection");
const showDepartments = require("./utils/showDepartments.js");
const showRoles = require("./utils/showRoles.js");
const showAllEmployees = require("./utils/showEmployees.js");
const addEmployee = require("./utils/addEmployee.js");
const addDepartment = require("./utils/addDepartment");
const addRole = require("./utils/addRole");
const updateEmployee = require("./utils/updateEmployee");


const startQuestions = {
    name: "questions",
    message: "Welcome to employee manager, what would you like to do?",
    type: "list",
    choices: [
        "Show All Departments",
        "Show All Roles",
        "Show All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee's Role",
    ]
}

const start = () => {
    inquirer.prompt(startQuestions)
        .then(response => {
            console.log("the user chose", response)

            // based on user choice, we'll ask additional questions
            switch (response.questions) {
                case "Show All Departments":
                    const allDepartments = showDepartments();
                    return setTimeout(start, 3000);
                case "Show All Roles":
                    const allRoles = showRoles();
                    return setTimeout(start, 3000);
                case "Show All Employees":
                    const allEmployees = showAllEmployees();
                    return setTimeout(start, 3000);
                case "Add A Department":
                    return addDepartment(start, 3000);
                case "Add A Role":
                    return addRole(start, 3000);
                case "Add An Employee":
                    return addEmployee(start, 3000);
                case "Update An Employee's Role":
                    return updateEmployee(start, 3000);

            }
        })
}

const init = () => {
    start();
}

init()