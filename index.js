const inquirer = require("inquirer");
const db = require("./config/connection.js");

const startQuestions = {
    name: "questions",
    message: "Welcome to employee manager, what would you like to do?",
    type: "list",
    choices: [
        "Show All departments",
        "Show All Roles",
        "Show All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee's Role",
    ]

}

const addEmployeeQuestions = [
    {
        name: "first_name",
        message: "What is the employee's first name?",
    },
    {
        name: "last_name",
        message: "What is the employee's last name?"
    },
    {
        name: "role_id",
        message: "What is the employee's title?",
        type: "list",
        choices: [
            {}
        ]
    },

]

const addEmployee = () => {
    // Need to inquirer to gather info on new employee
    // we need all the currert rol id to allow choose role_id thats in role table,
    // we need all the current emp ids, to choose manager_id
    db.query(`SELECT id, first_name, last_name FROM employee`
    ).then((managers) => {

        console.log("managers-----------", managers)
        const managerChoices = managers.map(man => {
            return {
                name: `${man.first_name} ${man.last_name}`,
                value: man.id
            }
        })
        db.query(`SELECT id, title FROM role`).then((results) => {
            console.table(results);
            const choices = results.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            });

            console.log("CHOICES MADE FOR INQUIRER PROMPT----", choices)
            // converts results to an array of choices for prompt
            const addEmployeeQuestions = [
                {
                    name: "first_name",
                    message: "What is the employee's first name?",
                },
                {
                    name: "last_name",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role_id",
                    message: "What is the employee's title?",
                    type: "list",
                    choices
                },
                {
                    name: "manager_id",
                    message: "Who is this employee's manager?",
                    type: "list",
                    choices: managerChoices
                }
            ];

            inquirer.prompt(addEmployeeQuestions)
                .then(results => {
                    console.log("results -----", results)
                db.query("INSERT INTO employee SET ?", results)
                .then((start))
                });
        });
    });
}

const showAllEmployees = () => {
    // calls to db, and show all employees
    db.query("SELECT * FROM employee").then(results => {
        console.log("----------- EMPLOYEES ----------- ")
        console.table(results)
        // console.log("----------- EMPLOYEES ----------- ")
        return showAllEmployees();
    })
}

const start = () => {
    inquirer.prompt(startQuestions)
        .then(response => {
            console.log("the user chose", response)

            // based on user choice, we'll ask additional questions
            switch (response.questions) {
                case "Show All Employees":
                    return showAllEmployees();
                case "Add Employee":
                    return addEmployee();
            }
        })
}

start()