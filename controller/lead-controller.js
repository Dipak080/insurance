const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Lead = require("../models/lead-model");


async function createLead(req, res){
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        const {email, mobileNo} = req.body;
        const {carBrand, carModel, carYear, engineSize, suminsuredValue, provinceCity} = req.body;

        const user = await Lead.findOne({email : email});

        const leadData = {
            carBrand : carBrand,
            carModel : carModel,
            carYear : carYear,
            engigineSize : engineSize,
            suminsuredValue : suminsuredValue,
            provinceCity : provinceCity
        }
        if(user){
            // const pushedLeadToUser = await Lead.findOneAndUpdate({email : email},
            //     {$push : {leads : leadData}},
            //     {new : true}
            // );
            user.leads.unshift(leadData);
            await user.save();
            return res.status(200).json({
                msg : "new lead created",
                result : true
            })
        }else{
            const newUser = await Lead.create({
                email,
                mobileNo,
                leads : [leadData]
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

module.exports = {createLead, getAllLeads};