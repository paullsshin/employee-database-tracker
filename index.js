const inquirer = require("inquirer");
// const Department = require("./lib/Department");
// const Employee = require("./lib/Employee");
// const Role = require("./lib/Role");
const db = require("./config/connection");
require("console.table");
// const { start } = require("repl");

function initializer()  {
    inquirer
    .prompt([
        {
            type: "list",
            name: "mainMenu",
            message: "Please select from one of the following...",
            choices: [
                "View Departments",
                "Add a Department",
                "View Employees",
                "Add an Employee",
                "View Roles",
                "Add a Role",
                "Update an Employee",
                "Terminate Program"
                
            ]
            // message: "Select One of the Options",
            // name: "menu",
        }
    ]).then(response => {
        let answer = response.mainMenu;
        switch (answer) {
            case "View Departments":
                viewDepartments();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Update an Employee":
                updateEmployee();
                break;
            default:
                terminateProgram();
        }
    }).catch(error => {
        console.log('Error:', error);
    })
};

const viewDepartments = async () => {
  let query = "Select * FROM employee_db.department"
  db.query(query, (err, res) => {
    if (err) throw(err);
    console.table(res)
    initializer();
  })
}

const addDepartment = async () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "createDepartment",
            message: "What department would you like to add?",
        },
    ])
    .then (async (response) => {
        let query = "INSERT department(name) VALUES(?)"
        db.query(query, response.createDepartment, (err,res) => {
            if (err) throw (err);
            console.log(res),
            console.log("Department added");
        })
    
    })
}

const viewEmployees = async () => {
    let query = "Select employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager from employee left join role on employee.role_id=role.id left join department on role.department_id=department.id left join employee manager on employee.manager_id=manager.id"
    db.query(query, (err, res) => {
        if (err) throw(err);
        console.table(res)
        initializer();
      })
}

const addEmployee = async () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "employeeName",
            message: "What is the first name of your new employee?"
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "What is the last name of your employee?"
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the ID of your employee?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the employee's manager ID?"
        },
    ])
    .then (async(response) => {
        let query = "INSERT INTO employee_db.employee(first_name, last_name, role_id, manager_id) VALUES(?)"
        db.query(query, response.employeeName, response.employeeLastName, response.roleId, response.managerId, (err,res) => {
            if (err) throw (err);
            console.log(res,"Employee Added!");
            initializer();
        })
    })
}

const viewRoles = async () => {
    let query = "Select * FROM employee_db.role"
    db.query(query, (err, res) => {
      if (err) throw(err);
      console.table(res)
      initializer();
    })
  }

  const addRole = async () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What role will you be adding?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?",
        },
        {
            type: "input",
            name: "departmentId",
            message: "What department ID will this role be assigned to?",
        },
    ])
    .then (async (response) => {
        let query = "INSERT INTO employee_db.role(title, salary, department_id) VALUES(?)"
        db.query(query, response.title, response.salary, response.department_id, (err, res) => {
            if(err) throw(err);
            console.log(res, "Role added!")
        })
    })
  }

  const updateEmployee = async () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "chooseEmployee",
            message: "Which employee would you like to update?"
        },
        {
            type: "input",
            name: "updateEmployee",
            message: "Which role will you be assigning to the employee?"
        },
    ])
    .then (async (response) => {
        let query = "Select employee.first_name, employee.last_name, role.title"
    db.query(query, response.first_name, response.last_name, response.role_id, (err, res) => {
        if (err) throw(err);
        console.table(res)
        initializer();
      })
    })
  }

initializer();