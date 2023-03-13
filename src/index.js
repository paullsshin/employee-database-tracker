const inquirer = require("inquirer");
const Department = require("../lib/Department");
const Employee = require("../lib/Employee");
const Role = require("../lib/Role");
const db = require("../config/connection");
const cTable = require("console.table");
const { start } = require("repl");

const initializer = () => {
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
                "Terminate Program"
            ],
            // message: "Select One of the Options",
            // name: "menu",
        },
    ])

    .then((response) => {
        const answer = response.menu;
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
            case "Terminate Program":
                terminate();
                break;
                default:
                    break;
        }
    });
};

const viewDepartments = async () => {
    const department = new Department();
    console.table(await department.getDepartments());
    initializer();
}

initializer();