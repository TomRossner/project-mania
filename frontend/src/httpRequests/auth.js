import axios from "axios";

const BASE_URL = 'http://191.101.80.174/';

export const loginUser = async (values) => {
    return await axios.post(`${BASE_URL}auth/login`, values);
}

export const addNewUser = async (values) => {
    const {first_name, last_name, email, password} = values;
    return await axios.post(`${BASE_URL}auth/register`, {first_name, last_name, email, password});
}