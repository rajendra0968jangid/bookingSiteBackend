import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import multer from "multer";

const app = express();

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
        console.log(req.body);
        console.log(req.files);
        res.status(200).json({ data: "hello form" })
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(8000)
