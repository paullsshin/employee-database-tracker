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

    async createDepartment() {
        await db
        .promise()
        .query(`Insert (name) and (values) ('${this.name}')`)
        .then(([answers]) => {
            console.log('Created a New Department');
        })
        .catch(console.log)
    }
}

module.exports = Department;