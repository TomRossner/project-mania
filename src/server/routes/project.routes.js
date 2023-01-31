const express = require("express");
const ProjectRouter = express.Router();
const {getProjects, addProject, updateProject} = require("../controllers/project.controllers")

ProjectRouter.get("/projects", getProjects);
ProjectRouter.post("/projects", addProject);
ProjectRouter.put("/projects", updateProject);

module.exports = ProjectRouter;