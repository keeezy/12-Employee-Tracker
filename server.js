const inquirer = require("inquirer");

const startQuestions = {
    name: "questions",
    message: "Welcome to employee manager, what would you like to do?",
    type: "list",
    choices: [
        "Add Employee",
        "Update Employee",
        "Show All Employees",
        "Delete an Employee"
    ]

}

const showAllEmployees = () => {
    // calls to db, and show all employees
}

const start = () => {
    inquirer.prompt(startQuestions)
    .then(response => {
        console.log("the user chose", response)

        // bases on user choice, w'ell ask additional questions
        switch(response.questions){
            case "Show All Employees":
        }
    })
}

start()