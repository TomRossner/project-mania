import axios from "axios";

axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';

export const getTask = async (ids) => {
    const {id, task_id} = ids;
    return await axios.get(`/projects/${id}/${task_id}`);
}

export const getMembers = async () => {
    const response = await axios.get(`/auth/users`);
    console.log(response)
    return response;
}

export const getProjects = async (id) => {
    return await axios.get(`/projects/${id}/all`);
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