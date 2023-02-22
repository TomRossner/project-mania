import axios from "axios";

axios.defaults.baseURL = 'http://tomrossner.dev/projectmania'

export const getTask = async (ids) => {
    const {id, task_id} = ids;
    return await axios.get(`/projects/${id}/${task_id}`);
}

export const getMembers = async () => {
    return await axios.get(`/auth/users`);
}

export const getProjects = async (id) => {
    return await axios.get(`/projects/${id}/all`);
}

export const updateProject = async (project) => {
    console.log(project._id)
    return await axios.put(`/projects/${project._id}`, project);
}

export const addProject = async (values) => {
    return await axios.post(`/projects/add`, values);
}