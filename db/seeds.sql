INSERT INTO department
    (name)
VALUES
("Customer Service"),
("Front Desk");

INSERT INTO role(title, salary, department_id)
VALUES
("Customer Service Rep", 60000, 1),
("Front Desk Rep", 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Jim", "Bo", 1, NULL),
("James", "Bo", 2, NULL);
