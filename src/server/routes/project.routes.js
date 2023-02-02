const express = require("express");
const ProjectRouter = express.Router();
const {getProjects, addProject, updateProject, getTask} = require("../controllers/project.controllers")

ProjectRouter.get("/projects", getProjects);
ProjectRouter.post("/projects", addProject);
ProjectRouter.put("/projects", updateProject);
ProjectRouter.post("/tasks", getTask);

module.exports = ProjectRouter;