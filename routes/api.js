const express = require('express');
const router = express.Router();
const DataList = require('../models/DataList.js');

//Routes
router.get('/', (req, res) => {
    /* const data = {
        id: 1,
    name: "parul",
    supervisor: "john",
    task_title: "need to do hmwk",
    task_desc: "read a book",
    due_date: "03 Dec 1979",
    type: "Backlogged"
    }; */

    DataList.find({ })
      .then((data) => {
        console.log('Data: ', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
    
});

router.post('/save', (req, res) => {
    const data = req.body;

    const newDataList = DataList(data);
    newDataList.save((error) => {
        if (error) {
            res.status(500).json({msg: 'Sorry, internal server errors'});
            return;
        } else {
            res.json({msg: 'Your data has been saved!!!'});
        }
    });
    
  });

router.get('/name', (req, res) => {
    const data = {
        id: 1,
    name: "a",
    supervisor: "b",
    task_title: "c",
    task_desc: "d",
    due_date: "03 Dec 1979",
    type: "In Progress"
    };
    res.json(data);
});

module.exports = router;