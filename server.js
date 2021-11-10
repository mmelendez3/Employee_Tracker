const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql2');
require('console.table');


// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
  );

//   // Get all departments
// app.get('/api/departments', (req, res) => {
//     const sql = `SELECT * FROM department`;
  

  // Get all roles
// app.get('/api/roles', (req, res) => {
//     const sql = `SELECT role.*, department.name AS department_name
//      FROM role
//      LEFT JOIN department ON role.department_id = department.id`;
  

  
//   // Get all employees
// app.get('/api/employees', (req, res) => {
//     const sql = `SELECT * FROM employee`;
  


  const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
        }])
        .then(userChoice => {
            switch (userChoice.menu) {
                case 'view all departments':
                    selectDepartments();
                    break;
                case 'view all roles':
                    selectRoles();
                    break;
                case 'view all employees':
                    selectEmployees();
                    break;
                case 'add a department':
                    promptAddDepartment();
                    break;
                case 'add a role':
                    promptAddRole();
                    break;
                case 'add an employee':
                    promptAddEmployee();
                    break;
                case 'update an employee role':
                    promptUpdateRole();
                    break;
                default:
                    process.exit();
            }
        });
};

const selectDepartments = () => {
  connection.query(
      'SELECT * FROM department;',
      (err, results) => {
          console.table(results); // results contains rows returned by server
          promptMenu();
      });
};

const selectRoles = () => {
  connection.query(
    `SELECT role.id, role.title, role.salary, department.name AS department_name
     FROM role
     LEFT JOIN department ON role.department_id = department.id;`,
      (err, results) => {
          console.table(results); // results contains rows returned by server
          promptMenu();
      }
  )
};

const selectEmployees = () => {
  connection.query(
   `SELECT employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department,
            role.salary, 
            CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`,
      (err, results) => {
          console.table(results); // results contains rows returned by server
          promptMenu();
      }
  )
};

  

promptMenu();