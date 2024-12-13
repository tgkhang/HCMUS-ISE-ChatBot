"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const { body, getErrorMessage } = require("../controllers/validator");

router.get("/login", controller.show);

router.post("/login",
  body("username") 
    .trim()
    .notEmpty().withMessage("Username is required"),
  body("password")
  .trim().notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    console.log(req.body);
    let message = getErrorMessage(req);
    console.log(message);
    if (message) {
        console.log(message);
      return res.render("login", { loginMessage: message });
    }
    next();
  },
  controller.login
);

router.post('/logout', controller.logout);

router.get('/register',controller.signup);

router.post('/register', 
  body('firstName').trim().notEmpty().withMessage('First name is required!'),
  body('lastName').trim().notEmpty().withMessage('Last name is required!'),
  body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email address!'),
  body('password').trim().notEmpty().withMessage('Password is required!'),
  body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
  body('confirmPassword').custom((confirmPassword, { req }) => {
      if (confirmPassword != req.body.password) {
          throw new Error('Passwords not match!');
      }
      return true;
  }),
  (req,res,next)=>{
    console.log(req.body);
    let message = getErrorMessage(req);
    if (message) {
      console.log(message)
      return res.render("signup", { registerMessage: message });
    }
    next();
  },
  controller.register
);

router.get('/forgot',controller.showForgotPassword);
router.post('/forgot',
  body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email address!'),
  (req,res,next)=>{
    let message = getErrorMessage(req);
    if (message) {
      return res.render("forgotPassword", {  message });
    }
    next();
  },
  controller.forgotPassword
);

//reset router catching
router.get('/reset',controller.showResetPassword);
router.post('/reset',
  body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email address!'),
  body('password').trim().notEmpty().withMessage('Password is required!'),
  body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
  body('confirmPassword').custom((confirmPassword, { req }) => {
      if (confirmPassword != req.body.password) {
          throw new Error('Passwords not match!');
      }
      return true;
  }),
  (req,res,next)=>{
    //console.log(req.body);
    let message = getErrorMessage(req);
    if (message) {
      console.log(message)
      return res.render("changePassword", { message,email: req.body.email || '' });
    }
    next();
  }//,(req,res)=>{console.log(req.body)}
  ,
  controller.resetPassword
);


module.exports = router;
