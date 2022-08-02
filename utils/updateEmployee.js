const db = require("../config/connection.js");
const inquirer = require('inquirer');

const updateEmployee = (callbackStart) => {
    db.query(`SELECT id, first_name, last_name FROM employee`
    ).then((employees) => {

        // console.log("managers-----------", managers)
        const employeeChoices = employees.map(emp => {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }
        })
        db.query(`SELECT id, title FROM role`).then((results) => {
            // console.table(results);
            const roleChoices = results.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            });

            // console.log("CHOICES MADE FOR INQUIRER PROMPT----", choices)
            // converts results to an array of choices for prompt
            const updateEmployeeQuestions = [
                {
                    name: "id",
                    message: "Which employee would you like to update?",
                    type: "list",
                    choices: employeeChoices
                },
                {
                    name: "role_id",
                    message: "What is the employee's new title?",
                    type: "list",
                    choices: roleChoices
                }
            ]
            inquirer.prompt(updateEmployeeQuestions)
            .then((results) => {
                console.log("Updated Employee!", results)
                db.query('UPDATE employee SET ? WHERE ?', [results, { id: results.id }])
                .then(() => {
                    callbackStart();
                })
            })
        })
})
}

module.exports = updateEmployee;