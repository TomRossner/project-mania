
const mongoose = require("mongoose");
const {defaultStages} = require("../utils/defaultProperties");

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    created_at: {type: Date, default: new Date()},
    last_login: {type: Date, default: Date.now()}
})

const boardSchema = new mongoose.Schema({
    created_at: {type: Date, default: new Date()},
    stages: {type: Array,  default: [...defaultStages]},
    members: {type: Array},
    due_date: {type: Date, default: new Date().toDateString()},
    title: {type: String, default: "New Board"},
    subtitle: {type: String},
    edit_active: {type: Boolean, default: false},
    options_menu_open: {type: Boolean, default: false}
})

const stageSchema = new mongoose.Schema({
    stage_name: {type: String, default: "New Stage"},
    description: {type: String},
    stage_tasks: {type: Array},
    created_at: {type: Date, default: new Date()},
    edit_active: {type: Boolean, default: false},
    options_menu_open: {type: Boolean, default: false},
    tasks_done: {type: Number, default: 0}
})

const taskSchema = new mongoose.Schema({
    created_at: {type: Date, default: new Date()},
    current_stage: {type: String},
    project: {type: String},
    title: {type: String, default: "New Task"},
    due_date: {type: Date, default: new Date().toDateString()},
    isDone: {type: Boolean, default: false},
    edit_active: {type: Boolean, default: false},
    files: {type: Array},
})


const User = mongoose.model("User", userSchema);
const Board = mongoose.model("Board", boardSchema);
const Stage = mongoose.model("Stage", stageSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = {
    User,
    Board,
    Stage,
    Task
}