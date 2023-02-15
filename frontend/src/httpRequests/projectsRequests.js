import axios from "axios";

const BASE = 'http://191.101.80.174:5000';

export const getTask = async (ids) => {
    const {id, task_id} = ids;
    return await axios.post(`${BASE}/projects/${id}/${task_id}`);
}

export const getMembers = async () => {
    return await axios.get(`${BASE}/auth/users`);
}

export const getProjects = async () => {
    return await axios.get(`${BASE}/projects/all`);
}

export const updateProject = async (project) => {
    return await axios.put(`${BASE}/projects/${project._id}`, project);
}

export const addProject = async (values) => {
    return await axios.post(`${BASE}/projects/add`, values);
}