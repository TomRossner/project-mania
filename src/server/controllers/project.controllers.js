const {Board} = require("../models");
const {boardsCollection} = require("../db");
const {ObjectId} = require("mongodb");

async function getProjects(req, res) {
    try {
        const projects = await boardsCollection.find({}).toArray();
        res.send(projects);
    } catch (error) {
        console.log(error);
    }
}

async function addProject(req, res) {
    try {
        const newProject = req.body;
        const project = new Board(newProject);
        boardsCollection.insertOne(project);
        res.send(project);
    } catch (error) {
        console.log(error);
    }
}

async function updateProject(req, res) {
    try {
        const {
            created_at,
            due_date,
            edit_active,
            members,
            options_menu_open,
            stages,
            subtitle,
            title,
            _id: projectId
        } = req.body;

        const project = await boardsCollection.updateOne({_id: ObjectId(`${projectId}`)}, {
            $set: {
                created_at: created_at,
                due_date: due_date,
                edit_active: edit_active,
                members: [...members],
                options_menu_open: options_menu_open,
                stages: [...stages],
                subtitle: subtitle,
                title: title
            }
        });
        res.send(project);
    } catch (error) {
        console.log(error);
    }
}

async function getTask(req, res) {
    try {
        const {id: projectID, task_id} = req.body;
        const project = await boardsCollection.findOne({_id: ObjectId(`${projectID}`)});
        const task = project.stages.map(stage => {
            return stage.stage_tasks.find(task => Number(task._id) === Number(task_id))
        })
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProjects,
    addProject,
    updateProject,
    getTask
}