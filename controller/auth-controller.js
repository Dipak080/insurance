const User = require("../models/user-model");
const bcrypt = require('bcrypt');

const home = async(req,res)=>{
    try {
        res.status(200).send("home");
    } catch (error) {
        console.log(error)
    }
}
const register = async(req,res)=>{
    try {
        const { username, email } = req.body;        
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }     
        
        const saltRounds = 10;
        const has_password = await bcrypt.hash('123345',saltRounds);
        const newUser = await User.create({ username, email });
        res.status(201).json({ data: newUser });  // Updated status code to 201 for resource creation
    } catch (error) {
        res.status(400).send({error:error});
    }
}
module.exports = {home,register};