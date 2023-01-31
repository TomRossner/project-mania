const {User} = require("../models");
const {usersCollection} = require("../db");

async function getUsers(req, res) {
    try {
        const users = await usersCollection.find({}).toArray();
        res.send(users);
    } catch (error) {
        console.log(error);
    }
}

async function register(req, res) {
    try {
        const newUser = req.body; 
        const user = new User(newUser);
        usersCollection.insertOne(user);
    } catch (error) {
        console.log(error);
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;
        const user = await usersCollection.findOne({email: email, password: password});
        if (user) res.send(user);
        else return res.status(404).send("User not found");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    register,
    login
}