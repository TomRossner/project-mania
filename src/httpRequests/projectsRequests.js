import axios from "axios";

export const getTask = async (ids) => {
    const {data} = await axios.post('/tasks', ids);
    return data[0];
}

export const getMembers = async () => {
    const {data} = await axios.get("/users")
    return data;
}

export const getProjects = async () => {
    const {data} = await axios.get("/projects");
    return data;
}

export const updateProject = async (project) => {
    const {data} = await  axios.put("/projects", project);
    return data;
}