import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String},
    tags:[{type:String}],
    category:{type:String, default:"General"},
    isPinned:{type:Boolean, default:false}
}, 
{timestamps:true}
)

notesSchema.index({
  title: "text",
  content: "text",
  category:"text"
});

const Notes = mongoose.model("Notes", notesSchema)

export default Notes;