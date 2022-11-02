const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbconfig')
const app = express();
app.use(bodyParser.json());

const port = 5000;

// Get all students
app.get("/api/students", (req, res) => {
  db.query('SELECT * FROM student', (err, result) => {
     if (err)
       console.error(err);
     else
        //res.json({"users": ["userOne", "userTwo", "userThree"]})
        res.json({"users": result.rows})
  })
})

app.get("/api/teachers", (req, res) => {
  db.query('SELECT * FROM teacher', (err, result) => {
     if (err)
       console.error(err);
     else
        //res.json({"users": ["userOne", "userTwo", "userThree"]})
        res.json({"users": result.rows})
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});