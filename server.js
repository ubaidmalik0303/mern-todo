require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser())


//MongoDB Connection
mongoose.connect('mongodb+srv://admin:admin123@cluster0.kemen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Database Connection Successfull");
    })
    .catch(() => {
        console.log("Database Connection Unsuccessfull");
    })


//Routes
app.use('/', require('./routes/todo'));
app.use('/', require('./routes/signup'));
app.use('/', require('./routes/login'));


//Port
app.listen(port, () => {
    console.log("Server Is Running On Port: " + port);
});

