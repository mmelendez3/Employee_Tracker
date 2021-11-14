# Employee Tracker

  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)
- [Technology Used](#technology-used)
- [Questions](#questions)

## Description
This is a command-line application built to help manage a company's employee database, using Node.js, Inquirer, and My SQL.

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```



## Installation

To install this application, clone the code into your terminal for the respective repository. Then, install npm by entering the command ```npm init```  into the terminal. Inquirer must then be installed by entering ```npm install inquirer```. Finally, the program can then be run by entering ```node server``` into the command line, and answering each question appropriately.

 
## Usage
1. Clone the package in your terminal
2. Install npm: npm init -y
3. Install inquirer: npm i inquirer
4. Install mysql
5. In the command-line, run "node server"
6. Answer all of the questions in the command-line

## License
This application is rendered under MIT

## Contributors
To contribute to Employee_tracker, clone this repo locally and commit your code on a separate branch.
  


## Tests
no tests where commited for this project.

## Preview of app final product

  -[Link to Demo Video](https://drive.google.com/file/d/1Q6rpkgDysue1cKyvmQdITqT1-zxz4O0u/view)


 

## Technology Used
- Node.js
- Inquirer
- MySQL

## Questions
- Find me on GitHub: https://github.com/mmelendez3
- Email me with questions: mele0019@gmail.com