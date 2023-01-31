const express = require("express");
const app = express();
const PORT = 3001;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const AuthRouter = require("./routes/auth.routes");
const ProjectRouter = require("./routes/project.routes");
const {client} = require("./db");

const initDB = async () => {
    try {
        await client.connect();
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
}

initDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(AuthRouter);
app.use(ProjectRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));