const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const cTable = require('console.table');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

  // Get all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  
  // Get all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT role.*, department.name AS department_name
     FROM role
     LEFT JOIN department ON role.department_id = department.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  
  // Get all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });