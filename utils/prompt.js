const db = require("../config/connection.js");

const start = () => {
    inquirer.prompt(startQuestions)
        .then(response => {
            console.log("the user chose", response)

            // based on user choice, we'll ask additional questions
            switch (response.questions) {
                case "Show All Departments":
                    return showDepartments();
                case "Show All Roles":
                    return showRoles();
                case "Show All Employees":
                    return showAllEmployees();
                case "Add A Department":
                    return addDepartment();
                case "Add A Role":
                    return addRole();
                case "Add An Employee":
                    return addEmployee();
                case "Update An Employee's Role":
                    return updateEmployeeRole();
            }
        })
}

module.exports = start;