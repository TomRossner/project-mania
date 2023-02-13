const express = require("express");
const app = express();
const PORT = 3001;
const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("pg");
const cors = require("cors");

const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
})

const connectDb = async () => {
    try {
        await client.connect();
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const getUsers = async (req, res) => {
    try {
        const users = await client.query('SELECT * FROM users;');
        return res.send(users.rows);
    } catch (error) {
        console.log(error)
    }
}

const newUserProperties = [
    "first_name",
    "last_name",
    "email",
    "password"
]

const addNewUser = async (user) => {
    if (!user) return;

    const {first_name, last_name, email, password} = user;
    try {
        return await client.query(
            `INSERT INTO users (${[...newUserProperties]})
            VALUES ('${first_name}', '${last_name}', '${email}', '${password}')`
        );
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    if (!req.body) return;

    const {email, password} = req.body;
    try {
        const user = await client.query(
            `SELECT * FROM users
            WHERE email = '${email}'
            AND password = '${password}';`
        );
        if (user) return res.send(user.rows[0]);
    } catch (error) {
        console.log(error);
    }
}

app.get("/users", getUsers);

app.post('/users', addNewUser);

app.post("/login", login);


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));