const db = require("../config/connection.js");

const showManagers = () => {
    // calls to db, and show all employees
    db.query("SELECT * FROM employee").then(results => {
        console.log("----------- EMPLOYEES ----------- ")
        console.table(results)
        // console.log("----------- EMPLOYEES ----------- ")
    });
}

module.exports = showManagers;