const db = require('../config/connection');

class Department {
    constructor (name = "") {
        this.name = name;
    }

    async getDepartments() {
        let data = [];
        await db 
        .promise()
        .query("Select * FROM department")
        .then(([answers]) => {
            data = answers
        })
        .catch(console.log);
        return data;
    }

    async addDepartment() {
        await db
        .promise()
        .query(`Insert (name) and (values) ('${this.name}')`)
        .then(([answer]) => {
            console.log('Created a New Department');
        })
        .catch(console.log)
    }
}

module.exports = Department;