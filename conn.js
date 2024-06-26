import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/mydatabase');

const con = mongoose.connection;
con.on('open', () => {
    console.log("connection success");
})

const formSchema = new mongoose.Schema({
    hotelname: String,
    hotelphone: String,
    hotelemail: String,
    hotellocation: String,
    hotelrent: String,
    hotelimage:String
})

const Form = mongoose.model('Form',formSchema)
const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type:String,
        unique:true
    },
    password: String,
    phone:String,
})

const User = mongoose.model('User',userSchema)

export {Form,User}


