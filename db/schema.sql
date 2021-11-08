DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS duty;
-- DROP TABLE IF EXISTS employee;




CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- CREATE TABLE duty (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(30) NOT NULL,
--   salary INTEGER,
--   department_id INTEGER,
  
--   CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
-- );

-- CREATE TABLE employee (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   duty_id INTEGER,
--   manager_id INTEGER
--   CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
-- );