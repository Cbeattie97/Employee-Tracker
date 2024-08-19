const inquirer = require('inquirer');
const {pool} = require('pg');
const { start } = require('repl');

const connection = new pool ({
    host: "localhost",
    port: 5432,
    user: "root",
    password: "1234",
    database: "employee_tracker"
});

inquirer
.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "Menu",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    }
])
.then((response) => {
    switch(response.Menu) {
        case "View All Employees":
            viewEmployees();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployee();
            break;
        case "View All Roles":
            viewRoles();
            break;
        case "Add Role":
            addRole();
            break;
        case "View All Departments":
            viewDepartments();
            break;
        case "Add Department":
            addDepartment();
            break;
    }
});

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
function addEmployee() {
    connection.query("SELECT * FROM role", function(res) {
        inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee's first name",
                name: "firstName"
            },
            {
                type: "input",
                message: "Enter employee's last name",
                name: "lastName"
            },
            {
                type: "list",
                message: "Select employee's role",
                name: "role",
                choices: res.map(role => role.title)
            }
        ])
        .then((response) => {
            const role = res.find(role => role.title === response.role);
            connection.query("INSERT INTO Em", {
                First_Name: response.FirstName,
                Last_Name: response.LastName,
                role_id: role.id
            }, function(err, res) {
                if (err) throw err;
                else () => {
                console.log(' Employee added');
                start();
        }});
        });
    });
    
}
function updateEmployee() {
    console.log("Update Employee");
}
function viewRoles() {
    console.log("View Roles");
}
function addRole() {
    console.log("Add Role");
}
function viewDepartments() {
    console.log("View Departments");
}
function addDepartment() {
    console.log("Add Department");
}

