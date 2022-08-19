const express = require('express');
const {Users,User_Suggestions,Sequelize} = require('../models'); 
const Joi = require('joi');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));          

const schema = Joi.object({
                        
        userId: Joi.number().integer(), 
        name: Joi.string().trim().required().min(3).max(30),
        purpose: Joi.string().trim().required().min(15).max(250),
        location: Joi.string().trim().required().min(3).max(55),
        description: Joi.string().trim().required().min(5).max(250),
        role: Joi.string().trim().required().min(15).max(250) 

});       


const schema2 = Joi.object({
    
        name: Joi.string().trim().required().min(3).max(30),
        purpose: Joi.string().trim().required().min(15).max(250),
        location: Joi.string().trim().required().min(3).max(55),
        description: Joi.string().trim().required().min(5).max(250),
        role: Joi.string().trim().required().min(15).max(250) 

}); 

function authToken(req,res,next){       

    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json(null);
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

        if(err) return res.status(401).json(err);

        req.user = user; 
        next();

    });

}


route.get('/user_suggestions',(req,res)=>{

    User_Suggestions.findAll({include:['user']})
        .then(rows => res.json(rows))
        .catch(err => res.status(500));

});

route.get('/user_suggestions/:id',authToken,(req,res)=>{

    User_Suggestions.findOne({where:{id:req.params.id},include:['user']})
        .then(row => res.json(row))
        .catch(err => res.status(500));

});

route.post('/user_suggestions',authToken,(req,res)=>{         

    const suggestion = {
        userId: req.body.userId,
        name: req.body.name,
        purpose: req.body.purpose,
        location: req.body.location,
        description: req.body.description,
        role: req.body.role
    }

    if(suggestion.userId == null){
        suggestion.userId = req.user.userId;
    }

    const {error,value} = schema.validate(suggestion);

    if(!error){

    Users.findOne({where:{id:suggestion.userId}})
        .then(user => {

                if(user!=null && ((!user.isAdmin && !user.isModerator))){
                    User_Suggestions.create(suggestion)
                        .then(row => res.json(row))
                        .catch(err => res.status(500).json(null));
                    
                }else{
                    res.json(null);
                }
        })
        .catch(err => res.status(500).json(null));

    }else{
        res.status(500).json(null);
    }

});
            
route.delete('/user_suggestions/:id',authToken,(req,res)=>{

    User_Suggestions.findOne({where:{id:req.params.id}})
        .then(row => {

                row.destroy()
                    .then(row => res.json(row))
                    .catch(err => res.status(500))

        })
        .catch(err => res.status(500).json(null));

});

route.put('/user_suggestions/:id',authToken,(req,res)=>{

    const suggestion = {
        name: req.body.name,
        purpose: req.body.purpose,
        location: req.body.location,
        description: req.body.description,
        role: req.body.role
    }

    const {error,value} = schema2.validate(suggestion); 

    if(!error){

        User_Suggestions.findOne({where:{id:req.params.id},include:['user']})
            .then(row => {

                row.name = suggestion.name;
                row.description = suggestion.description;
                row.purpose = suggestion.purpose;
                row.role = suggestion.role;
                row.location = suggestion.location;

                row.save()
                    .then(replaced => res.json(replaced))
                    .catch(errer => res.status(500).json(null));

            })
            .catch(err => res.status(500).json(null));

    }else{
            res.status(500).json(null); 
    }

});

module.exports = route;