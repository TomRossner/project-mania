const {User} = require("../models");
const {usersCollection} = require("../db");
const {validateRegistrationInputs, validateLoginInputs} = require("../validations/auth.validations");

async function getUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Failed getting users"});
    }
}

async function register(req, res) {
    try {
        const newUser = req.body; 
        const {error} = validateRegistrationInputs(newUser);
        if (error) return res.status(400).send({error: error.details[0].message});

        const user = await new User(newUser).save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Registration failed"});
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;
        const {error} = validateLoginInputs(req.body);
        if (error) return res.status(400).send({error: error.details[0].message});

        const user = await User.findOne({email: email, password: password});
        if (!user) return res.status(404).send({error: "User not found"});
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Login failed"});
    }
}

module.exports = {
    getUsers,
    register,
    login
}