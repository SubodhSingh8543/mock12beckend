const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../modals/userModal");
const { EmployeeModel } = require("../modals/employeeModal");
const userRoute = express.Router();

userRoute.post("/signup",async (req,res) => {
    const {email,password} = req.body;
    try {
        bcrypt.hash(password, 5,async (err, hash) => {
            const user = await new UserModel({email,password:hash});
            user.save();
            res.status(200).send({"msg":"user registered successfuly"});
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"error occured"});
    }
});

userRoute.post("/login",async (req,res) => {
    const {password,email} = req.body;
    try {
        const user = await UserModel.find({email});
        if(user.length > 0){
            bcrypt.compare(password, user[0].password,async (err, result) => {
               if(result){
                res.status(200).send({"msg":"user login successfull","token":jwt.sign({userID:user[0]._id},"subodh")});
               }else{
                res.status(400).send({"msg":"login Failed"});
               }    
            })
        }else{
            res.status(400).send({"msg":"login Failed"});
        } 
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"error occured"});
    }
});

userRoute.post("/employees",async (req,res) => {
    const payload = req.body;
    try {
        const employee = await new EmployeeModel(payload);
        employee.save();
        res.status(200).send({"msg":"employee added successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"error occured"});
    }
})

userRoute.get("/employees",async (req,res) => {
    try {
        const employee = await EmployeeModel.find();
        res.status(200).send(employee);
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"error occured"});
    }
})

module.exports = {userRoute};