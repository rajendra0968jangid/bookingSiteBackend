import mongoose from "mongoose";

mongoose.connect('mongodb://rajendra0968jangid:71XRWGUdx1X7fRqf@ac-d1apbty-shard-00-00.hh3bywt.mongodb.net:27017,ac-d1apbty-shard-00-01.hh3bywt.mongodb.net:27017,ac-d1apbty-shard-00-02.hh3bywt.mongodb.net:27017/uniqueone?ssl=true&replicaSet=atlas-r6lhzh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');

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


