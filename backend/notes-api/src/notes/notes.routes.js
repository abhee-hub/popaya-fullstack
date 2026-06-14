import express from "express";
import NotesController from "./notes.controllers.js";

const noteRoutes = express.Router();

const notesController = new NotesController();

noteRoutes.post("/", (req, res,next)=>{
    notesController.createNotes(req, res,next)
})

noteRoutes.get("/", (req, res,next)=>{
    notesController.getNotes(req, res,next)
})

noteRoutes.get("/:id", (req,res,next)=>{
    notesController.getNoteById(req,res,next)
})

noteRoutes.put("/:id", (req,res,next)=>{
    notesController.updateNote(req,res,next)
})

noteRoutes.delete("/:id", (req,res,next)=>{
    notesController.deleteNote(req,res,next)
})

export default noteRoutes;
