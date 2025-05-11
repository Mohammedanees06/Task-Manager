import express from "express";
import cors from "cors";
import { connectdb } from "./config/db.js";
import todoroutes from "./routes/todo.route.js";


const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hi World");
});


app.use(express.json());

app.use("/api/todos",todoroutes);

app.listen(3000, () => {
    connectdb();
    console.log("Server is running on port 3000");
});