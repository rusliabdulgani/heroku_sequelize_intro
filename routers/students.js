const express = require('express');
const db = require('../models');

var router = express.Router();


router.get('/', (req, res) => {
  db.Student.findAll({
      order: [
        ['first_name', 'ASC']
      ]
    })
    .then(data => {
      res.render('students', {
        header: 'Student Page',
        title: 'Students Page',
        data_students: data,
        err_msg: ''
      })
    })
})

router.post('/', (req, res) => {
  let data = req.body;
  db.Student.create({
      first_name: data.First_name,
      last_name: data.Last_name,
      email: data.Email,
      jurusan: data.Jurusan
    })
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      msg_str = err.errors[0].message;
      db.Student.findAll({
          order: [
            ['first_name', 'ASC']
          ]
        })
        .then(data => {
          res.render('students', {
            header: 'Students Page',
            data_students: data,
            err_msg: msg_str
          })
          console.log(`-----------------------${JSON.stringify(err)}`);
        })
    })
})

router.get('/edit/:id', (req, res) => {
  let id = req.params.id
  db.Student.findById(id)
    .then(data => {
      res.render('edit_student', {
        title: 'edit students page',
        header: 'Edit Student Page',
        edit_student: data,
        err_msg: null
      });
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body;
  db.Student.update({
      first_name: data.First_name,
      last_name: data.Last_name,
      email: data.Email,
      jurusan: data.Jurusan
    }, {
      where: {
        id: id
      }
    })
    .then(() => {
      res.redirect('/students');
    })
    .catch(err => {
      msg_str = err.errors[0].message;
      db.Student.findAll()
        .then(data => {
          res.render('students', {
            header: 'Edit Student Page',
            data_students: data,
            err_msg: msg_str
          })
          console.log(`-----------------------${JSON.stringify(err)}`);
        })
    })
})

router.get('/delete/:id', (req, res) => {
  let id = req.params.id
  db.Student.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/:id/addsubject', (req, res) => {
  let id = req.params.id;
  db.Student.findById(id, {
      include: [{ all: true}]
    })
    .then ( data1 => {
      db.Subject.findAll()
      .then(data2 => {
        res.render('addSubject', {title: 'Add subject page',header: 'Add Subject Page',dataAddSubject: data1, dataSubject: data2})
        console.log('---------------------', data1.jurusan);
      })
    })
  
})

router.post('/:id/addsubject', (req, res) => {
  let id = req.params.id;
  data = req.body
  db.StudentsSubject.create({
    StudentId: parseInt(id),
    SubjectId: data.SubjectId
  })
  .then( () => {
    res.redirect('/students')
  })
})



module.exports = router;
