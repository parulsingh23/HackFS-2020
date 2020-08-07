const mongoose = require('mongoose');
//Schema
const Schema = mongoose.Schema;
const DataListSchema = new Schema({
    id: Number,
    name: String,
    supervisor: String,
    task_title: String,
    task_desc: String,
    due_date: String,
    type: String
});

//Model
const DataList = mongoose.model('DataList', DataListSchema);

module.exports = DataList;