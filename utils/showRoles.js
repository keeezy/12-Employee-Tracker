const db = require("./config/connection.js");

const showRoles = () => {
    // calls to db, and show all employees
    db.query("SELECT * FROM role").then(results => {
        console.log("----------- ROLES ----------- ")
        console.table(results)
        // console.log("----------- EMPLOYEES ----------- ")
        return showRoles();
    })
}

module.exports = showRoles;