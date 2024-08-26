
const inquirer = require('inquirer');
const { Pool } = require('pg');
const { start } = require('repl');

const Pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "root",
    password: "1234",
    database: "employee_tracker"
});

module.exports = pool;

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Add the case for "Update Role Salary" in the inquirer prompt response handler
inquirer
.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "Menu",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "Delete Employee", "View All Roles", 
            "Add Role", "View All Departments", "Add Department", "Update Employee Department", "Update Role Salary"],
    }
])
.then((response) => {
    switch(response.Menu) {
        case "View All Employees":
            viewEmployees();
            break;
        case "Add Employee":
            inquirer.prompt([
                { type: 'input', name: 'name', message: 'Employee Name:' },
                { type: 'input', name: 'role', message: 'Employee Role:' },
                { type: 'input', name: 'department', message: 'Employee Department:' }
            ]).then(addEmployee);
            break;
        case "Update Employee Role":
            inquirer.prompt([
                { type: 'input', name: 'id', message: 'Employee ID:' },
                { type: 'input', name: 'newRole', message: 'New Role:' }
            ]).then(({ id, newRole }) => updateEmployeeRole(id, newRole));
            break;
        case "Delete Employee":
            inquirer.prompt([
                { type: 'input', name: 'id', message: 'Employee ID:' }
            ]).then(({ id }) => deleteEmployee(id));
            break;
        case "View All Roles":
            viewRoles();
            break;
        case "Add Role":
            inquirer.prompt([
                { type: 'input', name: 'title', message: 'Role Title:' },
                { type: 'input', name: 'salary', message: 'Role Salary:' },
                { type: 'input', name: 'department_id', message: 'Department ID:' }
            ]).then(addRole);
            break;
  
            inquirer.prompt([
                { type: 'input', name: 'id', message: 'Role ID:' }
            ]).then(({ id }) => deleteRole(id));
            break;
        case "View All Departments":
            viewDepartments();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Update Employee Department":
            inquirer.prompt([
                { type: 'input', name: 'id', message: 'Employee ID:' },
                { type: 'input', name: 'newDepartmentId', message: 'New Department ID:' }
            ]).then(({ id, newDepartmentId }) => updateEmployeeDepartment(id, newDepartmentId));
            break;
        case "Update Role Salary":
            inquirer.prompt([
                { type: 'input', name: 'id', message: 'Role ID:' },
                { type: 'input', name: 'salary', message: 'New Salary:' }
            ]).then(({ id, salary }) => updateRoleSalary(id, salary));
            break;
        // Add other cases here
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
function updateEmployeeRole() {
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
function deleteEmployee() {
    connection.query("SELECT * FROM employee", function(res) {
        inquirer
        .prompt([
            {
                type: "list",
                message: "Select employee to delete",
                name: "employee",
                choices: res.map(employee => employee.First_Name)
            }
        ])
        .then((response) => {
            const employee = res.find(employee => employee.First_Name === response.employee);
            connection.query("DELETE FROM employee WHERE id = ?", employee.id, function(err, res) {
                if (err) throw err;
                else {
                    console.log('Employee deleted');
                    start();
                }
            });
        });
    });
    console.log("Delete Employee");
}
function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
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
    });
    console.log("Add Role");
}
function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
function addDepartment() {
    inquirer
    .prompt([
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
function updateEmployeeDepartment() {
    connection.query("SELECT * FROM employee", function(res) {
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
            connection.query("SELECT * FROM department", function(res) {
                inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Select new department",
                        name: "department",
                        choices: res.map(department => department.name)
                    }
                ])
                .then((response) => {
                    const department = res.find(department => department.name === response.department);
                    connection.query("UPDATE employee SET department_id = ? WHERE id = ?", [department.id, employee.id], function(err, res) {
                        if (err) throw err;
                        else {
                            console.log('Employee updated');
                            start();
                        }
                    });
                });
            });
        });
    });
    console.log("Update Employee Department");
}
function updateRoleSalary() {
    connection.query("SELECT * FROM role", function(res) {
        inquirer
        .prompt([
            {
                type: "list",
                message: "Select role to update",
                name: "role",
                choices: res.map(role => role.title)
            }
        ])
        .then((response) => {
            const role = res.find(role => role.title === response.role);
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter new salary",
                    name: "salary"
                }
            ])
            .then((response) => {
                connection.query("UPDATE role SET salary = ? WHERE id = ?", [response.salary, role.id], function(err, res) {
                    if (err) throw err;
                    else {
                        console.log('Role updated');
                        start();
                    }
                });
            });
        });
    });
    console.log("Update Role Salary");
}

