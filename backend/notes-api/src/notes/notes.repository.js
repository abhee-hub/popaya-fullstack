import Notes from "./notes.schema.js"

export default class NotesRepository{

    async createNotes(data){
        const note = new Notes(data);
        await note.save();
        return note;
    }

    async getNotes(search){
        const query = search ? {$text:{$search:search}} : {};
        
        return await Notes.find(query).sort({isPinned:-1, createdAt:-1})
    }

    async getNoteById(id){
        return await Notes.findById(id)
    }

    async updateNote(id,data){
        return await Notes.findByIdAndUpdate(id,data,{returnDocument:"after"})
    }

    async deleteNote(id){
        return await Notes.findByIdAndDelete(id)
    }

}