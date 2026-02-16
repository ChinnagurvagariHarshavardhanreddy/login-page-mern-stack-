import mongoose, { Types } from "mongoose";
const userSchema = new mongoose.Schema({
   email : String,
   password : String
})
const login = mongoose.model('login',userSchema)
export default login