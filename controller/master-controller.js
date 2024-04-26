const User = require("../models/master-model");
// const bcrypt = require('bcrypt');

const organizationRoleInsert = async(req,res)=>{
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const { roleName } = req.body;        
        const existingRole = await OrganizationRole.findOne({ name: roleName });
        if (existingRole) {
            return res.status(400).json({ message: 'Organization role with this name already exists' });
        }        
        const newRole = new OrganizationRole({ name: roleName });
        await newRole.save();
        res.status(201).json({ message: 'Organization role created successfully', role: newRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const InsuranceRoleInsert = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      const { name } = req.body;      
      const existingRole = await InsuranceRole.findOne({ name });
      if (existingRole) {
        return res.status(400).json({ message: 'Role with this name already exists' });
      }        
      const newRole = new InsuranceRole({ name });      
      await newRole.save();  
      res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const getorganizationRole = async(req,res)=>{
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const roles = await organizationRole.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getInsuranceRole = async(req,res)=>{
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const roles = await insuranceRole.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {organizationRoleInsert,InsuranceRoleInsert,getorganizationRole,getInsuranceRole};