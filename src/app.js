"use strict";

require('dotenv').config();

const express = require("express");
const app = express();
//handlebar
const expressHandlebars = require("express-handlebars");
//port
const port = process.env.PORT || 3000;
//morgan
const morgan = require("morgan");
//session
const session=require('express-session');

//static folder
app.use(express.static(__dirname +'/public'));
app.use(morgan("combined"));
app.set("views", __dirname + "/views");
//handlebar
app.engine(
    "hbs",
    expressHandlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        runtimeOptions: {
            allowProtoPropertiesByDefault:true,
        },
        helpers: {
            formatDate: (date) => {
                return new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            },
            eq: (a, b) => a === b,
        },
    })
);

app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const loginRoute = require('./routes/login');
//tất cả những route liên quan đến /, đứng sau / -> sử dụng webRoute
app.get('/', (req, res) => {
    res.redirect('/login');
})
app.use('/login', loginRoute);

const homeRoute = require('./routes/home');
app.use('/home', homeRoute);

const chatRoute = require('./routes/chat');
app.use('/chat', chatRoute);

// kết nối AI engine:
const geminiRoute = require('./routes/api_gemini');
app.use('/api/gemini', geminiRoute);

//start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

