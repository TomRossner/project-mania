import axios from "axios";

export const loginUser = async (values) => {
    return await axios.post("/auth/login", values);
}

export const addNewUser = async (values) => {
    const {first_name, last_name, email, password} = values;
    return await axios.post("/auth/register", {first_name, last_name, email, password});
}