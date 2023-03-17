const inquirer = require("inquirer");
const Department = require("./lib/Department");
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
                "View Managers",
                "Update a Manager",
                "View Budget of Each Department",
                
            ]
            // message: "Select One of the Options",
            // name: "menu",
        }
    ]).then(response => {
        let answer = response.mainMenu;
        switch (answer) {
            case "View Departments":
                getDepartments();
                break;
            case "Add a Department":
                createDepartment();
                break;
            case "View Employees":
                getEmployees();
                break;
            case "Add an Employee":
                createEmployee();
                break;
            case "View Roles":
                getRoles();
                break;
            case "Add a Role":
                createRole();
                break;
            case "View Managers":
                getManagers();
                break;
            case "Update a Manger":
                updateManager();
                break;
            case "View Budget":
                getBudget();
                break;
            default:
                terminateProgram();
        }
    }).catch(error => {
        console.log('Error:', error);
    })
};

const getDepartments = async () => {
  let query = "Select * FROM employee_db.department"
  db.query(query, (err, res) => {
    if (err) throw(err);
    console.table(res)
    initializer();
  })
}

const createDepartment = async () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "createDepartment",
            message: "What department would you like to add?",
        },
    ])
    .then (async (response) => {
        let query = "Select"
    })
}

const getEmployees = async () => {
    let query = "Select employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager from employee left join role on employee.role_id=role.id left join department on role.department_id=department.id left join employee manager on employee.manager_id=manager.id"
    db.query(query, (err, res) => {
        if (err) throw(err);
        console.table(res)
        initializer();
      })
}
initializer();