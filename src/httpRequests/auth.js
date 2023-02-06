import axios from "axios";

export const loginUser = async (values) => {
    if (!values) return;
    try {
        const {data} = await axios.post("/login", values);
        console.log(data);
        return data;
    } catch (error) {
        console.log(`No user associated with email ${values.email} found.`)
    }
}

export  const addNewUser = async (values) => {
    if (!values) return;
    const {first_name, last_name, email, password} = values;
    return await axios.post("/users", {first_name, last_name, email, password});
}