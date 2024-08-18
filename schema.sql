DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
\c employee_tracker;


CREATE TABLE Department (
	id SERIAL PRIMARY KEY,
	Department_name VARCHAR(255) NOT NULL

);


CREATE TABLE Roles (
	id SERIAL PRIMARY KEY,
	Title VARCHAR(255) NOT NULL,
	Salary NUMERIC(10,2) NOT NULL,
	Department VARCHAR(255) NOT NULL,
	FOREIGN KEY(Department) REFERENCES Department(Department_name)
);


CREATE TABLE Employee (
	id, SERIAL PRIMARY KEY,
	First_Name VARCHAR(30) NOT NULL,
	Last_Name VARCHAR(30) NOT NULL,
	Role VARCHAR(255) NOT NULL,
	Manager VARCHAR(255),
	FOREIGN KEY(Role) REFERENCES Roles(Title),
	FOREIGN KEY(Manager) REFERENCES Employee(First_Name, Last_Name)
	
);


