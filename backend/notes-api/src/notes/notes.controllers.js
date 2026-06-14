import NotesRepository from "./notes.repository.js";
import { ApplicationError } from "../../middleware/error.middleware.js";

export default class NotesController{

    constructor(){
        this.notesRepository = new NotesRepository()
    }

    async createNotes(req, res, next){
        try{
            
        const result = await this.notesRepository.createNotes(req.body);

        
            return res.status(201).send({
                success:true,
                message:"Notes created successfully",
                data:result
            })
        
        }catch(err){
            console.log(err.message)
            next(new ApplicationError("Something went wrong", 500))
        }
    }

    async getNotes(req, res){
        try{
            const result = await this.notesRepository.getNotes(req.query.search)

            if(result){
              return res.status(200).send({
                success:true,
                message:"Notes fetched",
                data:result
              })
            }
        }catch(err){
           next(new ApplicationError("Something went wrong", 500))
        }
    }

    async getNoteById(req, res, next){
        try{
            const id = req.params.id;
            const result = await this.notesRepository.getNoteById(id)
            if(!result){
              return res.status(404).send({
                success:false,
                message:"Notes not found"
            })
            }

            res.status(200).send({
             success:true,
             message:"Note fetched",
             data:result
            })
        }catch(err){
            next(new ApplicationError("Something went wrong", 500))
        }
    }

    async updateNote(req,res,next){
        try{
            const id = req.params.id;
            const result = await this.notesRepository.updateNote(id, req.body);
            if(!result){
              return res.status(404).send({
                success:false,
                message:"Notes not found"
            })
            }

            res.status(200).send({
             success:true,
             message:"Note updated successfully",
             data:result
            })
        }catch(err){
            next(new ApplicationError("Something went wrong", 500))
        }
    }

    async deleteNote(req,res,next){
        try{
            const id = req.params.id;
            const result = await this.notesRepository.deleteNote(id);
            if(!result){
              return res.status(404).send({
                success:false,
                message:"Notes not found"
            })
            }

            res.status(200).send({
             success:true,
             message:"Note deleted successfully",
             data:result
            })

        }catch(err){
            next(new ApplicationError("Something went wrong", 500))
        }
    }

}