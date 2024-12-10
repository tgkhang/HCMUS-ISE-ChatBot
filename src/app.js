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
        },
    })
);

app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
    res.render('index');
})


//start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

