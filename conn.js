import mongoose from "mongoose";

mongoose.connect('mongodb+srv://rajendra0968jangid:1Xq9A6sWeM7Ezq8r@cluster0.rnzix4l.mongodb.net/backendbookingsite');

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