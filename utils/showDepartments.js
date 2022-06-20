const db = require("../config/connection.js");

const showDepartments = () => {
    // calls to db, and show all employees
    db.query("SELECT * FROM department").then(results => {
        console.log("----------- DEPARTMENTS ----------- ")
        console.table(results)
        // console.log("----------- EMPLOYEES ----------- ")
    })
}

module.exports = showDepartments;