const inquirer = require('inquirer')
const mysql = require('mysql2');
require('console.table');


// Connect to database
const db = mysql.createConnection(
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
  const sql =  `SELECT department.id AS id, department.name AS department
                FROM department`;
  
  db.query(sql, (err, results) => {
          console.table(results); 
          promptMenu();
      });
};

const selectRoles = () => {
  const sql =  `SELECT role.id, role.title, role.salary, department.name AS department
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
  
  db.query(sql, (err, results) => {
          console.table(results); 
          promptMenu();
      }
  )
};

const selectEmployees = () => {
  const sql =  `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  
db.query(sql, (err, results) => {
          console.table(results); 
          promptMenu();
      }
  )
};

const promptAddDepartment = () => {
  inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Name the department you would like to add?',
      validate: departmentName => {
          if (departmentName) {
              return true;
          } else {
              console.log('Please enter the name of your department!');
              return false;
          }
      }
  }
  ])
      .then(name => {
          db.promise().query("INSERT INTO department SET ?", name);
          selectDepartments();
      })
}

const promptAddRole = () => {

  return db.promise().query(
    "SELECT department.id, department.name FROM department;"
)
    .then(([departments]) => {
        let departmentChoices = departments.map(({
            id,
            name
        }) => ({
            name: name,
            value: id
        }));


  inquirer.prompt([{
      type: 'input',
      name: 'title',
      message: 'Enter the name of your title (Required)',
      validate: titleName => {
          if (titleName) {
              return true;
          } else {
              console.log('Please enter your title name!');
              return false;
          }
      }
          },
          {
            type: 'list',
            name: 'department',
            message: 'Which department are you from?',
            choices: departmentChoices
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter your salary (Required)',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('Please enter your salary!');
                    return false;
                }
            }
              }
              ]
          )
              .then(({ title, department, salary }) => {
                  const query = db.query(
                      'INSERT INTO role SET ?',
                      {
                          title: title,
                          department_id: department,
                          salary: salary
                      },
                      function (err, res) {
                          if (err) throw err;
                      }
                  )
              }).then(() => selectRoles())

            })

      
}

const promptAddEmployee = (roles) => {

  return db.promise().query(
      "SELECT role.id, role.title FROM role;"
  )
      .then(([employees]) => {
          let titleChoices = employees.map(({
              id,
              title

          }) => ({
              value: id,
              name: title
          }))

          db.promise().query(
              "SELECT employee.id, CONCAT(employee.first_name,' ',employee.last_name) AS manager FROM employee;"
          ).then(([managers]) => {
              let managerChoices = managers.map(({
                  id,
                  manager
              }) => ({
                  value: id,
                  name: manager
              }));

              inquirer.prompt(
                  [{
                      type: 'input',
                      name: 'firstName',
                      message: 'What is the employees first name (Required)',
                      validate: firstName => {
                          if (firstName) {
                              return true;
                          } else {
                              console.log('Please enter the employees first name!');
                              return false;
                          }
                      }
                  },
                  {
                      type: 'input',
                      name: 'lastName',
                      message: 'What is the employees last name (Required)',
                      validate: lastName => {
                          if (lastName) {
                              return true;
                          } else {
                              console.log('Please enter the employees last name!');
                              return false;
                          }
                      }
                  },
                  {
                      type: 'list',
                      name: 'role',
                      message: 'What is the employees role?',
                      choices: titleChoices
                  },
                  {
                      type: 'list',
                      name: 'manager',
                      message: 'Who is the employees manager?',
                      choices: managerChoices
                  }

                  ])
                  .then(({ firstName, lastName, role, manager }) => {
                      const query = db.query(
                          'INSERT INTO employee SET ?',
                          {
                              first_name: firstName,
                              last_name: lastName,
                              role_id: role,
                              manager_id: manager
                          },
                          function (err, res) {
                              if (err) throw err;
                              console.log({ role, manager })
                          }
                      )
                  })
                  .then(() => selectEmployees())
          })
      })
}

const promptUpdateRole = () => {

  return db.promise().query(
      "SELECT role.id, role.title, role.salary, role.department_id FROM role;"
  )
      .then(([roles]) => {
          let roleChoices = roles.map(({
              id,
              title

          }) => ({
              value: id,
              name: title
          }));

          inquirer.prompt(
              [
                  {
                      type: 'list',
                      name: 'role',
                      message: 'Which role do you want to update?',
                      choices: roleChoices
                  }
              ]
          )
              .then(role => {
                  console.log(role);
                  inquirer.prompt(
                      [{
                          type: 'input',
                          name: 'title',
                          message: 'Enter the name of your title (Required)',
                          validate: titleName => {
                              if (titleName) {
                                  return true;
                              } else {
                                  console.log('Please enter your title name!');
                                  return false;
                              }
                          }
                      },
                      {
                          type: 'input',
                          name: 'salary',
                          message: 'Enter your salary (Required)',
                          validate: salary => {
                              if (salary) {
                                  return true;
                              } else {
                                  console.log('Please enter your salary!');
                                  return false;
                              }
                          }
                      }]
                  )
                      .then(({ title, salary }) => {
                          const query = db.query(
                              'UPDATE role SET title = ?, salary = ? WHERE id = ?',
                              [
                                  title,
                                  salary
                                  ,
                                  role.role
                              ],
                              function (err, res) {
                                  if (err) throw err;
                              }
                          )
                      })
                      .then(() => promptMenu())
              })
      });

};

  

promptMenu();