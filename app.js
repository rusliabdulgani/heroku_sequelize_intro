const express = require('express');
const index = require('./routers/index')
const routeSubject = require('./routers/subjects');
const routeTeacher = require('./routers/teachers');
const routeStudents = require('./routers/students');

var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/teachers', routeTeacher);
app.use('/subjects', routeSubject);
app.use('/students', routeStudents);



// app.listen(3000);
app.listen(process.env.PORT || 3000);
