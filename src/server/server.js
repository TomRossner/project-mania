const express = require("express");
const app = express();
const PORT = 3001;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const AuthRouter = require("./routes/auth.routes");
const ProjectRouter = require("./routes/project.routes");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1/ProjectManiaDB")
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Failed to connect to database"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/projects", ProjectRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));