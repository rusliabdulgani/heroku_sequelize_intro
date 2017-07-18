const express = require('express');
const db = require('../models');
const letterScore = require('../helpers/score.js')

var router = express.Router();

router.get('/', (req, res) => {
  db.Subject.findAll({
    include: [db.Teacher]
  })
  .then( data => {
      res.render('subjects', {title: 'subject page',header: 'Subject Page', data_subject: data, data_kosong: 'Belum ada guru'})
      console.log(`--------------------- ${data[0].Teachers[0].first_name}`);
    })
})

router.post('/', (req, res) => {
  db.Subject.create(req.body)
  .then( data => {
    res.redirect('/subjects')
  })
})

router.get('/edit/:id', (req, res) => {
  let id = req.params.id
  db.Subject.findById(id)
  .then( data => {
    res.render('edit_subject', {title: 'edit page',header: 'Edit Subject Page', data_subject : data})
    console.log(`-------------------------- ${data.id}`);
  })
})

router.post('/edit/:id', (req, res) => {
  let id =  req.params.id
  let data = req.body
  db.Subject.update({data}, {
    where: {id:id}
  })
  .then( data =>{
    res.redirect('/subjects')
  })
  .catch( err => {
    console.log(err);
  })
})

router.get('/delete/:id', (req, res) => {
  let id = req.params.id
  db.Subject.destroy({
    where: {id:id}
  })
  .then( () => {
    res.redirect('/subjects');
  })
  .catch( err => {
    console.log(err);
  })
})

router.get('/:id/enrolledstudents', (req, res) => {
  let id = req.params.id
  db.StudentsSubject.findAll({
    order: [['Student','first_name']],
    where: {
      SubjectId:id
    },
    include: [{all: true}]
  })
  .then( data => {
    res.render('enrolledstudents', {title: 'enrolled students',header: 'Enrolled Students Page',dataEnrolled: letterScore(data)})
  })
})

router.get('/givescore/:id/:idSbj', (req, res)=> {
  let id = req.params.id;
  let idSbj = req.params.idSbj;
  db.StudentsSubject.findAll({
    where: {
      StudentId: id,
      $and: {SubjectId: idSbj}
    },
    include: [{all: true}]
  })
  .then( data => {
    res.render(`givescore`, {title:'Give Score Page',dataScore : data})
  })
})

router.post('/givescore/:id/:idSbj', (req, res) => {
  let data = req.body;
  let id = req.params.id;
  let idSbj = req.params.idSbj;
  db.StudentsSubject.update({
    score: data.score
  },{
    where: {
      StudentId:id,
      $and: {SubjectId:idSbj} 
    }
  })
  .then( ()=>{
    res.redirect(`/subjects/${req.params.idSbj}/enrolledstudents`)
  })
  .catch( err => {
    console.log(`error nya ${err}`);
  })
})





module.exports = router;
