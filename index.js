const { connect } = require('http2');
const inquirer = require('inquirer');
const PG = require('pg');
const { start } = require('repl');

const pool = new pool ({
    host: "localhost",
    port: 5432,
    user: "root",
    password: "1234",
    database: "employee_tracker"
});

PG.connect();

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
    connection.query ("SELECT * FROM employee", function(res) {
        inquirer
        .prompt([
            {
                type: "list",
                message: "Select employee to update",
                name: "employee",
                choices: res.map(employee => employee.First_Name)
            }
        ])
        .then((response) => {
            const employee = res.find(employee => employee.First_Name === response.employee);
            connection.query("SELECT * FROM role", function(res) {
                inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Select new role",
                        name: "role",
                        choices: res.map(role => role.title)
                    }
                ])
                .then((response) => {
                    const role = res.find(role => role.title === response.role);
                    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role.id, employee.id], function(err, res) {
                        if (err) throw err;
                        else () => {
                            console.log('Employee updated');
                            start();
                        }
                    });
                });
            });
        });
    });
    console.log("Update Employee");
}
function viewRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });

    console.log("View Roles");
}
function addRole() {
    connection.query("SELECT * FROM department", function(res) {
        inquirer
        .prompt([
            {
                type: "input",
                message: "Enter role title",
                name: "title"
            },
            {
                type: "input",
                message: "Enter role salary",
                name: "salary"
            },
            {
                type: "list",
                message: "Select role department",
                name: "department",
                choices: res.map(department => department.name)
            }
        ])
        .then((response) => {
            const department = res.find(department => department.name === response.department);
            connection.query("INSERT INTO role SET ?", {
                title: response.title,
                salary: response.salary,
                department_id: department.id
            }, function(err, res) {
                if (err) throw err;
                else {
                    console.log('Role added');
                    start();
                }
            });
        });
    

    consolelog("Add Role"); });
}
function viewDepartments() {

    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });

    console.log("View Departments");
}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter department name",
            name: "name"
        }
    ])
    .then((response) => {
        connection.query("INSERT INTO department SET ?", {
            name: response.name
        }, function(err, res) {
            if (err) throw err;
            else {
                console.log('Department added');
                start();
            }
        });
    });

    console.log("Add Department");
}

