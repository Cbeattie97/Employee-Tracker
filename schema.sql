--initialise new database 
DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
\c employee_tracker;

--create tables too store data
CREATE TABLE Department (
	id SERIAL,
	Department_Name VARCHAR(255) NOT NULL
);


CREATE TABLE Roles (
	id INTEGER,
	Title VARCHAR(255) NOT NULL,
	Salary NUMERIC(10,2) NOT NULL,
	Department TEXT,
	FOREIGN KEY(Department) REFERENCES Department(Department_Name)
);


CREATE TABLE Employee (
	id SERIAL,
	First_Name VARCHAR(30) NOT NULL,
	Last_Name VARCHAR(30) NOT NULL,
	Emplyoyee_Role VARCHAR(255) NOT NULL,
	Manager TEXT,
	FOREIGN KEY(Emplyoyee_Role) REFERENCES Roles(Title),
	FOREIGN KEY(Manager) REFERENCES Employee(First_Name, Last_Name)	
);


