INSERT INTO department
    (name)
VALUES
("Customer Service"),
("Sales"),
("Technical Support"),
("Management"),
("Financing");

INSERT INTO role(title, salary, department_id)
VALUES
("Customer Service Rep", 60000, 1),
("Sales", 50000, 2),
("Technical Support", 50000, 3),
("Management", 50000, 4),
("Financing", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Jim", "Bo", 1, NULL),
("James", "Bo", 2, NULL);
