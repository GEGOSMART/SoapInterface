
const express = require('express');
const router = express.Router();
const path = require("path");
var consumer = require('./consumer');

router.get('/all-courses', async function(req, res) {

    try {
        let courses = await consumer.getCourses();
        console.log(courses)
        return  res.status(200).json({ data: courses });
      } catch (error) {
        return  res.status(500).json({ data: "error" });
      }
      
  });

exports.router = router;