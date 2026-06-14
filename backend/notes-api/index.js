import "./dotenv.js"
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import noteRoutes from "./src/notes/notes.routes.js";
import dbConnection from "./config/config.js";
import { ApplicationError } from "./middleware/error.middleware.js";


const app = express();

app.use(cors())

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("This is Notes API")
})

app.use("/api/notes", noteRoutes);

app.use((req, res, next)=>{
    res.status(404).send({
        success:false,
        message:"API not found"
    })
})

app.use((err, req, res, next)=>{
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message)
    }

    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message)
    }

    res.status(500).send("Something went wrong!")
})


dbConnection();

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`This server is running on port ${port}`)
})