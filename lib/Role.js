const db = require("../config/connection");

class Role {
    constructor(title = "", salary = "", departmentId = "") {
      this.title = title;
      this.salary = salary;
      this.departmentId = departmentId;
    }

    async getRoles() {
        let data = [];
        await db
          .promise()
          .query(
            "SELECT role.id AS id , title, salary , name AS department FROM role INNER JOIN department ON department.id = role.department_id"
          )
          .then(([answers]) => {
            data = answers;
          })
          .catch(console.log);
        return data;
      }
    
      // function for creating new roles
      async createRole() {
        await db
          .promise()
          .query(
            `INSERT into role (title,salary,department_id) VALUES ('${this.title}',${this.salary},'${this.departmentId}')`
          )
          .then(([answers]) => {
            console.log("Added new role");
          })
          .catch(console.log);
      }
}