const db = require("../config/connection");

class Employee {
  constructor(
    firstName = "",
    lastName = "",
    roleId = null,
    managerId = null,
    id = null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
    this.id = id;
  }

  firstName() {
    return this.firstName;
  }
  lastName() {
    return this.lastName;
  }
  roleId() {
    return this.roleId;
  }
  managerId() {
    return this.managerId;
  }

  async getEmployees() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT employee.id AS id , employee.first_name, employee.last_name, title, name AS department, salary, CONCAT(manager_tb.first_name,' ',manager_tb.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee manager_tb ON manager_tb.id = employee.manager_id`
      )
      .then(([answers]) => {
        console.log("New Employee Added");
      })
      .catch(console.log);
    return data;
  }

  async createEmployee() {
    await db
      .promise()
      .query(
        `INSERT into employee (first_name,last_name,role_id,manager_id) VALUES ('${this.firstName}','${this.lastName}',${this.roleId},${this.managerId})`
      )
      .then(([answers]) => {
        console.log("Added new employee");
      })
      .catch(console.log);
  }

  async updateEmployee() {
    await db
      .promise()
      .query(
        `UPDATE employee SET role_id = ${this.roleId} WHERE id = ${this.id}`
      )
      .then(([answers]) => {
        console.log("Updated Successfully");
      })
      .catch(console.log);
  }

  async updateManager() {
    await db
      .promise()
      .query(
        `UPDATE employee SET manager_id = ${this.managerId} WHERE id = ${this.id}`
      )
      .then(([answers]) => {
        console.log("Updated Successfully");
      })
      .catch(console.log);
  }

  async getBudget() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT name AS department, SUM(salary) AS budget FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id GROUP BY department.id`
      )
      .then(([answers]) => {
        data = answers;
      })
      .catch(console.log);
    return data;
  }

  async getManagers() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT DISTINCT employee.id AS id, CONCAT(employee.first_name,' ',employee.last_name) AS name FROM employee manager_tb INNER JOIN employee ON employee.id = manager_tb.manager_id `
      )
      .then(([answers]) => {
        data = answers;
      })
      .catch(console.log);
    return data;
  }

  async getEmployeeByManager() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT id,first_name,last_name FROM employee WHERE manager_id = ${this.managerId} `
      )
      .then(([answers]) => {
        data = answers;
      })
      .catch(console.log);
    return data;
  }
}

module.exports = Employee;
