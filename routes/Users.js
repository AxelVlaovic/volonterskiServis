const {Sequelize,Users} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Joi = require('joi');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schema = Joi.object({

    name: Joi.string().trim().required().min(3).max(15),
    surname: Joi.string().trim().required().min(3).max(20),
    username: Joi.string().trim().required().min(3).max(15),
    email: Joi.string().trim().required().min(6).max(35).email(),
    password: Joi.string().trim().required().min(4).max(20),
    gender: Joi.string().trim().required().valid('Male','Female','Other')


});

function authToken(req,res,next){       

    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json({msg:'greška'});

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

        if(err) return res.status(401).json({msg:err});

        req.user = user;  
        next();

    });

}

function authTokenIsAdmin(req,res,next){       

    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json({msg:'greška'});

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

        if(err) return res.status(401).json(null);

        Users.findOne({where:{id:user.userId}})
        .then(row => {

           if(row!=null && row.isAdmin == true){
           
                req.user = user;
                next();
        
            }
            else{
                return res.status(401).json(null);
            }
            
        })
        .catch(err => res.status(500).json(null));

    });

}


route.get('/users',authToken,(req,res)=>{
    
    Users.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(null));

});

route.get('/users/:id',authToken,(req,res)=>{

    Users.findOne({where:{id:req.params.id},include: ['user_suggestions']})
        .then(row => res.json(row))
        .catch(err => res.status(500).json(null));

});

route.post('/users',authTokenIsAdmin,(req,res)=>{

    const  user = {
        name: req.body.name,   
        surname:req.body.surname,
        username:req.body.username,
        email:req.body.email,
        password: req.body.password,
        gender:req.body.gender
        
    };

    const {error,value} = schema.validate(user);

    if(!error && (req.body.password == req.body.repassword)){

    user.password = bcrypt.hashSync(req.body.password,10);
    user.isAdmin = req.body.isAdmin;
    user.isModerator = req.body.isModerator;

    Users.create(user)
        .then(row => res.json(row))
        .catch(err => res.status(500).json(null));

    }else{
        res.status(500).json(null);
    }

});


route.delete('/users/:id',authTokenIsAdmin,(req,res)=>{

    Users.findOne({where:{id:req.params.id}})    
        .then(usr => {

            usr.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(null));
        })    
        .catch(err => res.status(500).json(null));

});

    route.put('/users/:id',authTokenIsAdmin,(req,res)=>{

        const  obj = {
            name: req.body.name,   
            surname:req.body.surname,
            username:req.body.username,
            email:req.body.email,
            password: req.body.password,
            gender:req.body.gender
            
        };

        const {error,value} = schema.validate(obj);

        if(!error && (req.body.password == req.body.repassword)){

        Users.findOne({where:{id:req.params.id}})
            .then(row => {
                row.name = req.body.name;
                row.surname = req.body.surname;
                row.username = req.body.username;
                row.password = bcrypt.hashSync(req.body.password,10);
                row.email = req.body.email;
                row.gender = req.body.gender;
                row.isAdmin = req.body.isAdmin;
                row.isModerator = req.body.isModerator;

                row.save()
                    .then(user => res.json(user))
                    .catch(error => res.status(500).json(null));

            })
            .catch(err => res.status(500).json(null));

        }else{
            res.status(500).json(null);
        }
        
});

module.exports = route;
