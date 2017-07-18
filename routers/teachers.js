const express = require('express');
const db = require('../models');

var router = express.Router();


router.get('/', (req, res) => {
  // console.log('--------');
  db.Teacher.findAll({
    include: [db.Subject]
  })
  .then( data1 => {
    db.Subject.findAll()
    .then( data2 =>{
      res.render('teachers', {title: 'Teachers Page',header: 'Teachers Page',data_teacher: data1, data_subject: data2})
      data2.forEach( dt => {
        console.log('---------------------', dt.id , dt.subject_name);
      })
    })
  })
})


router.post('/', (req, res) => {
  db.Teacher.create(req.body)
  .then( data => {
    res.redirect('/teachers')
  })
  .catch( err => {
    console.log(err);
  })
})

router.get('/edit/:id', (req, res) => {
  let id = req.params.id
  db.Teacher.findById(id, {
    include: [db.Subject]
  })
  .then( data1 => {
    db.Subject.findAll()
    .then( data2 =>{
      res.render('edit_teacher', {title: 'edit teachers page', header: 'Edit Teacher', data_teacher: data1, data_subject: data2})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  let id= req.params.id
  let data= req.body
  
  db.Teacher.update({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    SubjectId: data.SubjectId || null
  }, 
  {where: {id:id}
  })
  .then( data => {
    res.redirect('/teachers')
  })
  .catch( err => {
    console.log(err);
  })
})

router.get('/delete/:id', (req, res) => {
  let id = req.params.id
  db.Teacher.destroy({
    where: {id:id}
  })
  .then( data => {
    res.redirect('/teachers');
  })
  .catch( err => {
    console.log(err);
  })
})


module.exports = router;
