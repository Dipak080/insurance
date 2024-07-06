const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Lead = require("../models/lead-model");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const UserOTPVerification = require('../models/otpverification-model');

let transporter = nodemailer.createTransport({
    service : "gmail",
    secure : true,
    port : 465,
    auth : {
        user : "pogulasiddharth96@gmail.com",
        pass : "cfqrqiwcgmymfjod"
    }
})

async function createLead(req, res){
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        var leadData = null;
        const {email} = req.body;
        console.log(req.body);
        if (Array.isArray(req.body.leads) && req.body.leads.length > 0) {
            const { carBrand, carModel, carYear, engineSize, suminsuredValue, provinceCity } = req.body.leads[0]; // Assuming you want to get the first lead
            leadData = {
                carBrand: carBrand,
                carModel: carModel,
                carYear: carYear,
                engineSize: engineSize,
                suminsuredValue: suminsuredValue,
                provinceCity: provinceCity
            };
        }
        const user = await Lead.findOne({email : email});

        if(user){ 
            const pushedLeadToUser = await Lead.findOneAndUpdate({email : email},
                {$push : {leads : leadData}},
                {new : true}
            );
            // user.leads.unshift(leadData);
            // await user.save();
            return res.status(200).json({
                msg : "new lead created",
                result : true
            })
        }else{
            const newUser = await Lead.create({
                email,
                leads : leadData!=null ? [leadData] : []
            })
            return res.status(200).json({
                msg : "leadCreate successfully" + newUser,
                result : true
            })
        }
    }
    catch(e){
        return res.status(400).json({
            error : "error while creating lead"+e.message
        })
    }
}

async function getAllLeads(req, res){
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        const allLeads = await Lead.find();
        return res.status(200).json({
            data : allLeads,
            result : true
        })
    }
    catch(e){
        return res.status(400).json({
            error : "error while fetching all leads"+ e.message,
            result : false
        })
    }
};


async function sendOTPVerificationEmail(req, res){
    const {email} = req.body;
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from : "pogulasiddharth96@gmail.com",
            to : email,
            subject : "Email Verification Code",
            html : `<p>Use this code <b>${otp}</b> to verify</p>
            <p>This code <b>expires in 2 minutes</b></p>`
        };
        // hashing the otp
        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        await UserOTPVerification.create({
            email : email,
            otp : hashedOtp,
            createdAt : Date.now(),
            expiredAt : Date.now() + 300000
        })
        await transporter.sendMail(mailOptions);
        res.json({
            status : "pending",
            message : "verification otp main sent",
            data : {
                email : email
            }
        })
    }
    catch(e){
        res.json({
            status : "failed",
            message : e.message
        })
    }
}

async function verifyOTP(req, res) {
    try {
        const { email, otp } = req.body;
        const userOtpVerification = await UserOTPVerification.findOne({ email });
        if (!userOtpVerification) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid email"
            });
        }

        const isOtpValid = await bcrypt.compare(otp, userOtpVerification.otp);

        if (!isOtpValid) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid or expired OTP"
            });
        }
        await UserOTPVerification.deleteOne({ email });

        return res.status(200).json({
            status: "verified",
            message: "OTP verified successfully",
            data: { email }
        });
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
}


async function resendOTP(req, res) {
    try {
        const { email } = req.body;

        // Check if user exists
        const userOtpVerification = await UserOTPVerification.findOne({ email });

        if (!userOtpVerification) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid email"
            });
        }

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: "pogulasiddharth96@gmail.com",
            to: email,
            subject: "Email Verification Code",
            html: `<p>Use this code <b>${otp}</b> to verify</p>
                   <p>This code <b>expires in 2 minutes</b></p>`
        };

        // Hashing the OTP
        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        await UserOTPVerification.updateOne(
            { email: email },
            { otp: hashedOtp, createdAt: Date.now(), expiredAt: Date.now() + 300000 } // 5 minutes
        );

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            status: "pending",
            message: "Verification OTP resent",
            data: { email }
        });
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
}



module.exports = {createLead, getAllLeads, sendOTPVerificationEmail, verifyOTP, resendOTP};