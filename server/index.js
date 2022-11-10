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
        res.json({"users": result.rows})
  })
})

const query1 = `SELECT subject.subjectid, subject.subjectname, student.firstname as stdfirstname,
student.lastname as stdlastname, teacher.firstname as tchfirstname, teacher.lastname as tchlastname
FROM student JOIN subject ON student.studentid = subject.studentid
JOIN teacher ON teacher.teacherid = subject.teacherid
ORDER BY subject.subjectid;`


app.get("/api/participations", (req, res) => {
  db.query(query1, (err, result) => {
    if(err)
      console.error(err)
    else
      res.json({"users": result.rows})
  })
})


const query2 = `SELECT subject.subjectid, subject.subjectname, teacher.firstname as tchfirstname, teacher.lastname as tchlastname
FROM subject
JOIN teacher
on subject.teacherid = teacher.teacherid`

app.get("/api/subjects", (req, res) => {
  db.query(query2, (err, result) => {
    if(err)
      console.error(err)
    else  
      res.json({"users": result.rows})
  })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});