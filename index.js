import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import multer from "multer";
import { Form } from "./conn.js"
import path from "path"
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'uploads')));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

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

app.get("/", async (req, res) => {
    try {
        res.json({ data: "hello" })
    }
    catch (err) {
        console.log(err)
    }
})

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        const passwordB = await bcrypt.hash(password, 10);
        console.log("password", password);
        console.log("passwordB", passwordB);
        return res.status(200).json({ data: "hello post" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ data: err.message })
    }
})

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
        res.status(200).json({ data: "hello form" })
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/bookingdata', async (req, res) => {
    try {
        const allData = await Form.find();
        res.status(200).json(allData)
    } catch (err) {
        console.log(err);
    }
})


// Route to serve the image
app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'upload', imageName);
    res.sendFile(imagePath);
});

app.delete("/bookingdatadelete/:id", async (req, res) => {
    try {
        const id = req.params.id
        const delData = await Form.deleteOne({ _id: id }); // returns {deletedCount: 1}
        res.status(200).json({ data: "successfully deleted" })
    }
    catch (err) {
        console.log(err)
    }
})

app.put("/bookingdataedit/:id", upload.fields([{ name: 'hotelimage', maxCount: 1 }]), async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body)
        let checkImage = (req.files['hotelimage'])?req.files['hotelimage'][0].filename:false;
        console.log(checkImage);
        const { hotelemail, hotellocation, hotelname, hotelphone, hotelrent } = req.body;
        const obj = {
            hotelname: hotelname,
            hotelphone: hotelphone,
            hotelemail: hotelemail,
            hotellocation: hotellocation,
            hotelrent: hotelrent,
            hotelimage:(checkImage)?req.files['hotelimage'][0].filename:req.body.hotelimage
        }

        const editData = await Form.findByIdAndUpdate(id, obj, { new: true });
        res.status(200).json({ data: "successfully updated" })
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/bookingdatabyid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const formData = await Form.findById(id).exec()
        // console.log(formData);
        res.status(200).json(formData)
    } catch (err) {
        console.log(err)
    }
})
app.listen(8000)
