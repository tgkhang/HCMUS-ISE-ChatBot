'use strict'
const LocalTrategy = require('passport-local');
const bcrypt= require('bcrypt');
const models=require('../database/models');
const passport = require('passport');


//gọi xác thực thành công, save user information to session 
passport.serializeUser((user, done) => {
    console.log("Serializing User:", user.id);
    done(null, user.id);
});

//call by passport.seesion, to take user info from db , push to req.user
passport.deserializeUser(async(id, done) => {
    try{
        let user= await models.User.findOne({
            attributes: ['id','firstName','lastName','email','token'],
            where: {id:id}
        });
        console.log("Deserializing User:", user.id);
        done(null, user);
    }
    catch(err){
        //console.error(err);
        done(err,null);
    }
})

//authen user when login
passport.use('local-login',new LocalTrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true// cho phép truền request vào call back để kiểm tra xem userr login chưa
}, async(req,username,password,done)=>{
    if(username){
        username=username.toLowerCase();// lowercase
    }
    try{
        if(!req.user){// not login yet
            let user=await models.User.findOne({where:{email:username }});
            if(!user){ //username not found
                return done(null, false, req.flash('loginMessage','User does not exist!'));
            }
            if(!bcrypt.compareSync(password,user.password)){
                return done(null, false, req.flash('loginMessage','InvalidPassword'));
            }
            //true allow login
            return done(null, user);
        }
        // skip login , login already
        done(null, req.user);
    }catch(error){
        console.error('Error during login:', error);
        done(error);
    }
}));


// register
passport.use('local-register',new LocalTrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true// cho phép truền vào call back để kiểm tra xem userr login chưa
}, async(req,email,password,done)=>{
    if(email){
        email=email.toLowerCase();// lowercase
    }
    if(req.user){return done(null,req.user);}
    try{
        let user= await models.User.findOne({ where:{email:email}});
        if(user){
            return done(null, false, req.flash('registerMessage','Email already exists!'));
        }

        user= await models.User.create({
            email: email,
            password: bcrypt.hashSync(password,bcrypt.genSaltSync(8)),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            token:25,
        });
        done(null,false,req.flash('registerMessage','You have registerd sucessfull please login'));

    }catch(error){
       // console.error('Error during login:', error);
        done(error);
    }
}));




module.exports =passport;