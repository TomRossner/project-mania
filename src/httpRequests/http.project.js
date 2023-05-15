import axios from "axios";

// Set Axios base URL
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/projectmania' : 'http://tomrossner.dev/projectmania';

// Get task
export const getTask = async (ids) => {
    const {id, task_id} = ids;
    return await axios.get(`/projects/${id}/${task_id}`);
}

// Get all user's related projects
export const getProjects = async (id) => {
    const {data} = await axios.get(`/projects/${id}/all`);
    return data;
}

// Update project
export const updateProject = async (project) => {
    return await axios.put(`/projects/${project._id}`, project);
}

// Add new project
export const addProject = async (values) => {
    return await axios.post(`/projects/add`, values);
}

// Delete task
export const deleteTask = async (ids) => {
    const {id, stage_id, task_id} = ids;
    return await axios.delete(`/projects/${id}/${stage_id}/${task_id}`);
}

// Delete project
export const deleteProject = async (id) => {
    return await axios.delete(`projects/delete/${id}`);
}

// Update admin pass code
export const updateAdminPass = async (admin_pass, projectId) => {
    return await axios.put('/projects/update-admin-pass', {admin_pass, projectId});
}