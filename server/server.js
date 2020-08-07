const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('../routes/api.js');






const MONGODB_URI = 'mongodb+srv://test:testing1@bbtkanban.acky4.mongodb.net/BBTkanban?retryWrites=true&w=majority';
//MONGODB_URI || (from below)
mongoose.connect( MONGODB_URI ||'mongodb://localhost/kanban', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!');
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
/* 
//saving data to our mongo database
const data = {
  id: 1,
    name: "a",
    supervisor: "b",
    task_title: "c",
    task_desc: "d",
    due_date: "Jan 01 1991",
    type: "Backlogged"
}


const newTask = new DataList(data); //instance of the model

 newTask.save((error) => {
  if (error) {
    console.log('Ooops, something happened');
  } else {
    console.log('Data has been saved!!');
  }
}); */ 
//.save();


// HTTP request logger
app.use(morgan('tiny'));

app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

//below is for ENV variables
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  };
};


//___________________________________________
/* const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router(); */

// this is our MongoDB database
//const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";
//const dbRoute = "mongodb+srv://test:<testing1>@bbtkanban.acky4.mongodb.net/<BBTkanban>?retryWrites=true&w=majority";

/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:<password>@bbtkanban.acky4.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */


// connects our back end code with the database
/* mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
); */

//let db = mongoose.connection;

//db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
//db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
/* app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev")); */

// this is our get method
// this method fetches all available data in our database
/* router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
}); */

// this is our update method
// this method overwrites existing data in our database
/* router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}); */

// this is our delete method
// this method removes existing data in our database
/* router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
}); */

// this is our create methid
// this method adds new data in our database
/* router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}); */

// append /api for our http requests
//app.use("/api", router);

// launch our backend into a port
//app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

