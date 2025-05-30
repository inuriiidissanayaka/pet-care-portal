const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Load students data from JSON file
const loadStudents = () => {
    const data = fs.readFileSync('students.json');
    return JSON.parse(data);
};

// Save students data to JSON file
const saveStudents = (students) => {
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
};

// Insert a Student
app.post('/students', (req, res) => {
    const students = loadStudents();
    const newStudent = req.body;
    students.push(newStudent);
    saveStudents(students);
    res.status(201).send('Student added successfully');
});

// Show all Students
app.get('/students', (req, res) => {
    const students = loadStudents();
    res.json(students);
});

// Find a Student by SID
app.get('/students/sid/:sid', (req, res) => {
    const students = loadStudents();
    const student = students.find(s => s.sid === req.params.sid);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

// Find Students by First Name
app.get('/students/firstname/:firstname', (req, res) => {
    const students = loadStudents();
    const filteredStudents = students.filter(s => s["First name"].toLowerCase() === req.params.firstname.toLowerCase());
    res.json(filteredStudents);
});

// Find Students by Last Name
app.get('/students/lastname/:lastname', (req, res) => {
    const students = loadStudents();
    const filteredStudents = students.filter(s => s["Second name"].toLowerCase() === req.params.lastname.toLowerCase());
    res.json(filteredStudents);
});

// Find Students by Email
app.get('/students/email/:email', (req, res) => {
    const students = loadStudents();
    const student = students.find(s => s.Email.toLowerCase() === req.params.email.toLowerCase());
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

// Find Students by Nearest City
app.get('/students/nearcity/:nearcity', (req, res) => {
    const students = loadStudents();
    const filteredStudents = students.filter(s => s["Near City"].toLowerCase() === req.params.nearcity.toLowerCase());
    res.json(filteredStudents);
});

// Find Students by Course
app.get('/students/course/:course', (req, res) => {
    const students = loadStudents();
    const filteredStudents = students.filter(s => s.Course.toLowerCase() === req.params.course.toLowerCase());
    res.json(filteredStudents);
});

// Find Students by Guardian
app.get('/students/guardian/:guardian', (req, res) => {
    const students = loadStudents();
    const filteredStudents = students.filter(s => s.Guardian.toLowerCase() === req.params.guardian.toLowerCase());
    res.json(filteredStudents);
});

// Update Student by SID
app.put('/students/sid/:sid', (req, res) => {
    const students = loadStudents();
    const index = students.findIndex(s => s.sid === req.params.sid);
    if (index !== -1) {
        students[index] = { ...students[index], ...req.body };
        saveStudents(students);
        res.send('Student updated successfully');
    } else {
        res.status(404).send('Student not found');
    }
});

// Update Student by First Name
app.put('/students/firstname/:firstname', (req, res) => {
    const students = loadStudents();
    const updatedStudents = students.map(s => 
        s["First name"].toLowerCase() === req.params.firstname.toLowerCase() 
        ? { ...s, ...req.body } 
        : s
    );
    saveStudents(updatedStudents);
    res.send('Students with matching first name updated successfully');
});

// Delete Student by SID
app.delete('/students/sid/:sid', (req, res) => {
    const students = loadStudents();
    const filteredStudents = students.filter(s => s.sid !== req.params.sid);
    if (filteredStudents.length !== students.length) {
        saveStudents(filteredStudents);
        res.send('Student deleted successfully');
    } else {
        res.status(404).send('Student not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
