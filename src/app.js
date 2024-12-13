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


//passport
const passport = require('./controllers/passport');
const flash = require('connect-flash');

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
app.use(express.urlencoded({extended:false}));

//session
app.use(session({
    secret:'S3cret',
    //secret:process.env.SESSION_SECRET,
    //store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 20*60 *1000 //20min
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//middleware for session
app.use((req, res, next) => {
    console.log("Session ID:", req.session ? req.session.ID : null);
    console.log("Is Authenticated:", req.isAuthenticated());
    res.locals.isLoggedIn = req.isAuthenticated();
    next();
});

app.use('/',require('./routes/authRouter')); 
app.use('/',require('./routes/indexRouter'));



app.use((req,res,next)=>{
    res.status(404).render('error',{message: 'FILE NOT FOUND'});
})
//
app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).render('error',{message:'Internal Server Error'});
})



//start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

