import axios from "axios";

const BASE = 'http://191.101.80.174:5000';

export const loginUser = async (values) => {
    return await axios.post(`${BASE}/auth/login`, values);
}

export const addNewUser = async (values) => {
    const {first_name, last_name, email, password} = values;
    return await axios.post(`${BASE}/auth/register`, {first_name, last_name, email, password});
}