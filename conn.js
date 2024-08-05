import mongoose from "mongoose";

mongoose.connect('mongodb://rajendra0968jangid:QsvtAztpE91H46tt@ac-8vpdky0-shard-00-00.1m4zxut.mongodb.net:27017,ac-8vpdky0-shard-00-01.1m4zxut.mongodb.net:27017,ac-8vpdky0-shard-00-02.1m4zxut.mongodb.net:27017/mydatabase?replicaSet=atlas-ztr7vs-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');

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


