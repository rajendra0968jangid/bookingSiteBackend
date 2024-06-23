import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/backendbookingsite');

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

export {Form}


