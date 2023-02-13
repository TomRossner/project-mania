import axios from "axios";

const BASE_URL = 'http://191.101.80.174/';

export const getTask = async (ids) => {
    const {id, task_id} = ids;
    return await axios.post(`${BASE_URL}projects/${id}/${task_id}`);
}

export const getMembers = async () => {
    return await axios.get(`${BASE_URL}auth/users`)
}

export const getProjects = async () => {
    return await axios.get(`${BASE_URL}projects/all`);
}

export const updateProject = async (project) => {
    return await axios.put(`${BASE_URL}projects/${project._id}`, project);
}

export const addProject = async (values) => {
    return await axios.post(`${BASE_URL}projects/add`, values);
}