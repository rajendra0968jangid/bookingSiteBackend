import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import multer from "multer";
import { Form, User } from "./conn.js"
import path from "path"
import { fileURLToPath } from 'url';

//use express 
const app = express();

//use for file send
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//use for get input from api (req.body)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//use for give access to use api any one
app.use(cors());

//use multer for file upload (get image in backend)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

//test api of backend
app.get("/", async (req, res) => {
    try {
        res.json({ data: null, message: "Hello backend" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ data: null, message: err.message })
    }
})

//post api for user signup
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        // const passwordB = await bcrypt.hash(password, 10);
        const obj = {
            username, email, password, phone
        }
        const newUser = new User(obj);
        const userData = await newUser.save();
        return res.status(200).json({ data: null, message: "User register successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ data: null, message: err.message })
    }
})

//post api for sign in user
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        return res.status(200).json({ data: userData, message: "User log in successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ data: null, message: err.message })
    }
})

//post api for booking form 
app.post("/bookingform", upload.fields([{ name: 'hotelimage', maxCount: 1 }]), async (req, res) => {
    try {
        const { hotelemail, hotellocation, hotelname, hotelphone, hotelrent } = req.body;
        const obj = {
            hotelname: hotelname,
            hotelphone: hotelphone,
            hotelemail: hotelemail,
            hotellocation: hotellocation,
            hotelrent: hotelrent,
            hotelimage: req.files.hotelimage[0].filename
        }
        const newForm = new Form(obj)
        const formData = await newForm.save()
        console.log(formData);
        // console.log(req.body);
        // console.log(req.files);
        res.status(200).json({ data: null, message: "Form submitted successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ data: null, message: err.message })
    }
})

//get api for get booking data
app.get('/bookingdata', async (req, res) => {
    try {
        const allData = await Form.find();
        res.status(200).json(allData)
    } catch (err) {
        console.log(err);
        res.status(500).json({ data: null, message: err.message })
    }
})


// create image api for image get from backend
app.get('/image/:imageName', (req, res) => {
    try {

        const imageName = req.params.imageName;
        const imagePath = path.join(__dirname, 'upload', imageName);
        res.sendFile(imagePath);
    }
    catch (err) {
        res.status(500).json({ data: null, message: err.message })
    }
});

//delete api for delete booking data by id
app.delete("/bookingdatadelete/:id", async (req, res) => {
    try {
        const id = req.params.id
        const delData = await Form.deleteOne({ _id: id }); // returns {deletedCount: 1}
        res.status(200).json({ data: null, message: "Successfully deleted" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ data: null, message: err.message })
    }
})

//put api for update booking data by id
app.put("/bookingdataedit/:id", upload.fields([{ name: 'hotelimage', maxCount: 1 }]), async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body)
        let checkImage = (req.files['hotelimage']) ? req.files['hotelimage'][0].filename : false;
        console.log(checkImage);
        const { hotelemail, hotellocation, hotelname, hotelphone, hotelrent } = req.body;
        const obj = {
            hotelname: hotelname,
            hotelphone: hotelphone,
            hotelemail: hotelemail,
            hotellocation: hotellocation,
            hotelrent: hotelrent,
            hotelimage: (checkImage) ? req.files['hotelimage'][0].filename : req.body.hotelimage
        }

        const editData = await Form.findByIdAndUpdate(id, obj, { new: true });
        res.status(200).json({ data: null, message: "Successfully updated" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ data: null, message: err.message })
    }
})

//get api for get booking data by id
app.get('/bookingdatabyid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const formData = await Form.findById(id).exec()
        res.status(200).json(formData)
    } catch (err) {
        console.log(err)
        res.status(500).json({ data: null, message: err.message })
    }
})
app.listen(8000)
