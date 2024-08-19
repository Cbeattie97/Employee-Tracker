

-- Insert data into Department table
INSERT INTO Department (Department_name) VALUES
	('Sales'),
	('Marketing'),
	('Finance');

-- Insert data into Roles table
INSERT INTO Roles (id, Title, Salary, Department) VALUES
	(1, 'Sales Manager', 5000.00, 'Sales'),
	(2, 'Marketing Coordinator', 3500.00, 'Marketing'),
	(3, 'Financial Analyst', 4500.00, 'Finance');

-- Insert data into Employee table
INSERT INTO Employee (id, First_Name, Last_Name, Emplyoyee_Role, Manager) VALUES
    (1, 'John', 'Doe', 'Sales Manager', NULL),
        (2, 'Jane', 'Smith', 'Marketing Coordinator', 'John Doe'),
        (3, 'Mike', 'Johnson', 'Financial Analyst', 'John Doe'),
        (4, 'David', 'Williams', 'Sales Manager', NULL),
        (5, 'Emily', 'Brown', 'Marketing Coordinator', 'David Williams'),
        (6, 'Chris', 'Jones', 'Financial Analyst', 'David Williams');