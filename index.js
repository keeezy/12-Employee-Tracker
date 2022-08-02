const inquirer = require("inquirer");
const db = require("./config/connection");
const showDepartments = require("./utils/showDepartments.js");
const showRoles = require("./utils/showRoles.js");
const showAllEmployees = require("./utils/showEmployees.js");
const showAllRoles = require("./utils/showRoles.js");
const addEmployee = require("./utils/addEmployee.js");
const addDepartment = require("./utils/addDepartment");


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

// const addEmployeeQuestions = [
//     {
//         name: "first_name",
//         message: "What is the employee's first name?",
//     },
//     {
//         name: "last_name",
//         message: "What is the employee's last name?"
//     },
//     {
//         name: "role_id",
//         message: "What is the employee's title?",
//         type: "list",
//         choices: [
//             {}
//         ]
//     },
//     {
//         name: "manager_id",
//         message: "Who is this employee's manager?",
//         type: "list",
//     }

// ]

// const addEmployee = () => {
//     // Need to inquirer to gather info on new employee
//     // we need all the currert rol id to allow choose role_id thats in role table,
//     // we need all the current emp ids, to choose manager_id
//     db.query(`SELECT id, first_name, last_name FROM employee`
//     ).then((managers) => {

//         console.log("managers-----------", managers)
//         const managerChoices = managers.map(man => {
//             return {
//                 name: `${man.first_name} ${man.last_name}`,
//                 value: man.id
//             }
//         })
//         db.query(`SELECT id, title FROM role`).then((results) => {
//             console.table(results);
//             const choices = results.map((role) => {
//                 return {
//                     name: role.title,
//                     value: role.id
//                 }
//             });

//             console.log("CHOICES MADE FOR INQUIRER PROMPT----", choices)
//             // converts results to an array of choices for prompt
//             const addEmployeeQuestions = [
//                 {
//                     name: "first_name",
//                     message: "What is the employee's first name?",
//                 },
//                 {
//                     name: "last_name",
//                     message: "What is the employee's last name?"
//                 },
//                 {
//                     name: "role_id",
//                     message: "What is the employee's title?",
//                     type: "list",
//                     choices
//                 },
//                 {
//                     name: "manager_id",
//                     message: "Who is this employee's manager?",
//                     type: "list",
//                     choices: managerChoices
//                 }
//             ];

//             inquirer.prompt(addEmployeeQuestions)
//                 .then(results => {
//                     console.log("results -----", results)
//                 db.query("INSERT INTO employee SET ?", results)
//                 .then((start))
//                 });
//         });
//     });
// }

// const showAllEmployees = () => {
//     // calls to db, and show all employees
//     db.query("SELECT * FROM employee").then(results => {
//         console.log("----------- EMPLOYEES ----------- ")
//         console.table(results)
//         // console.log("----------- EMPLOYEES ----------- ")
//         return showAllEmployees();
//     })
// }

// const start = () => {
//     inquirer.prompt(startQuestions)
//         .then(response => {
//             console.log("the user chose", response)

//             // based on user choice, we'll ask additional questions
//             switch (response.questions) {
//                 case "Show All Departments":
//                     return showDepartments();
//                 case "Show All Roles":
//                     return showRoles();
//                 case "Show All Employees":
//                     return showAllEmployees();
//                 case "Add A Department":
//                     return addDepartment();
//                 case "Add A Role":
//                     return addRole();
//                 case "Add An Employee":
//                     return addEmployee();
//                 case "Update An Employee's Role":
//                     return updateEmployeeRole();
//             }
//         })
// }

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
                    return addDepartment(start);
                case "Add A Role":
                    const addRole = addRole();
                    return setTimeout(start, 3000);
                case "Add An Employee":
                    return addEmployee(start);
                case "Update An Employee's Role":
                    const updateEmployeeRole = updateEmployeeRole();
                    return setTimeout(start, 3000);

            }
        })
}


// const showDepartments = () => {
//     // calls to db, and show all employees
//     db.query("SELECT * FROM department").then(results => {
//         console.log("----------- DEPARTMENTS ----------- ")
//         console.table(results);
//         // console.log("----------- EMPLOYEES ----------- ")
//         setTimeout(start, 3000);
//     });
// }

const init = () => {
    start();
}




init()