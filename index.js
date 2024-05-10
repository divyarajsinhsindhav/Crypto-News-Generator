const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.set('view engine', 'ejs');

app.use('/', router)

mongoose
    .connect('mongodb://localhost:27017/cryptoNewsGenrator')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error: ", err));

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})