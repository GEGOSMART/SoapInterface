
const express = require('express');
const router = express.Router();
const path = require("path");
var consumer = require('./consumer');

router.get('/', function(req, res) {

    try {
        let courses = await consumer.getCourses();
        console.log(courses)
        
      } catch (error) {
        //error
      }
    res.send('hello world');
  });

exports.router = router;