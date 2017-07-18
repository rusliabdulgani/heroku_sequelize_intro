const express = require('express');


var router = express.Router();


router.get('/', (req, res) =>{
  res.render('index', {title: 'school app',header: 'School App', role: ''})
})



module.exports = router;
