import axios from "axios";

// axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';
axios.defaults.baseURL = 'http://localhost:5000/projectmania';

export const getTask = async (ids) => {
    const {id, task_id} = ids;
    return await axios.get(`/projects/${id}/${task_id}`);
}

export const getMembers = async () => {
    const {data} = await axios.get(`/auth/users`);
    return data;
}

export const getProjects = async (id) => {
    const {data} = await axios.get(`/projects/${id}/all`);
    return data;
}

export const updateProject = async (project) => {
    return await axios.put(`/projects/${project._id}`, project);
}

export const addProject = async (values) => {
    return await axios.post(`/projects/add`, values);
}

export const deleteTask = async (ids) => {
    const {id, stage_id, task_id} = ids;
    return await axios.delete(`/projects/${id}/${stage_id}/${task_id}`);
}

export const deleteProject = async (id) => {
    return await axios.delete(`projects/delete/${id}`);
}