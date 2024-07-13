const route = require('express').Router()
const photoMathController = require('../controller/photoMath')
const express = require('express')
const app = express() ;

const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get('/photoMath', (req, res) => {
    res.render('photoMath')
})

route.post('/photMathUpload', upload.single('photo'), photoMathController.solveEquation)


module.exports = route