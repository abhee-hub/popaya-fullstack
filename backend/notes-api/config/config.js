import mongoose from "mongoose";

const url = process.env.DB_URL;

const dbConnection = async ()=>{
    try{
        await mongoose.connect(url);
        console.log("Database connected successfully")
    }catch(err){
        console.log(err.message)
    }
}

export default dbConnection;
      