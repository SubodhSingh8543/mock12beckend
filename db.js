require("dotenv").config();

const mongoose = require("mongoose");

const connect = mongoose.connect(`${process.env.mongoUrl}`);


module.exports = {connect}