"use strict";

const controller = {};
const models = require("../database/models");

const sequelize = require("sequelize");
const Op = sequelize.Op;


controller.showHomepage = async (req, res) => {

    let ID = req.user.id;
    res.locals.currentID = ID;
  
    res.render("index");
  };


  module.exports = controller;
