const {Sequelize,Activities,Users} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schema = Joi.object({

    name: Joi.string().trim().required().min(3).max(55),            
    organisation: Joi.string().trim().required().min(3).max(55),    
    description: Joi.string().trim().required().min(3).max(250),
    time: Joi.string().trim().required(),           
    location: Joi.string().trim().required().min(5).max(55),    
    outdoor: Joi.boolean().required(),
    date: Joi.date().greater('2022-1-19').required()


});

function authTokenIsAdminIsModerator(req,res,next){       

    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json({msg:'greška'});

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

        if(err) return res.status(401).json(null);

        Users.findOne({where:{id:user.userId}})
        .then(row => {

           if(row!=null && (row.isAdmin == true || row.isModerator == true)){
           
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


function timeValidation(str){

    var timeArr=str.split(":");

    if(timeArr.length!=2){           
        return false;
    }else{
        if(isNaN(timeArr[0]) || isNaN(timeArr[1])){                
            return false;
        }

        if(timeArr[0]<24 && timeArr[1]<60 ){
            return true;
        }else{
            return false;
        }

    }
    return true;

}

route.get('/activities',(req,res)=>{

    Activities.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

route.get('/activities/:id',(req,res)=>{

    Activities.findOne({where:{id:req.params.id}})
        .then(row => res.json(row))
        .catch(err => res.status(500));

});
            
route.post('/activities',authTokenIsAdminIsModerator,(req,res)=>{

    const activity = {
        name:req.body.name,
        organisation:req.body.organisation,
        description:req.body.description,
        time:req.body.time,
        location:req.body.location,
        outdoor:req.body.outdoor,
        date:req.body.date
    }

    const {error,value} = schema.validate(activity);

    if(!error && timeValidation(activity.time)){

        Activities.create(activity)
            .then(row => res.json(row))
            .catch(err => res.status(500).json(null));

    }else{
        res.json(null);
    }

});

route.delete('/activities/:id',authTokenIsAdminIsModerator,(req,res)=>{

    Activities.findOne({where:{id:req.params.id}})
        .then(activity => {
            activity.destroy()
                .then(row => res.json(row))

                .catch(err => res.status(500));
        })
        .catch(err => res.status(500));

});

route.put('/activities/:id',authTokenIsAdminIsModerator,(req,res)=>{

    Activities.findOne({where:{id:req.params.id}})
        .then(activity =>{

            const {error,value} = schema.validate(req.body);

            if(!error && timeValidation(req.body.time)){

                activity.name = req.body.name;
                activity.organisation = req.body.organisation;
                activity.description = req.body.description;
                activity.time = req.body.time;
                activity.date = req.body.date;
                activity.location = req.body.location;
                activity.outdoor = req.body.outdoor;

                activity.save()
                    .then(row => res.json(row))
                    .catch(err => res.status(500));
            

        }else{
            res.json(null);
        }

        })
        .catch(err => res.status(500).json(null));


});

module.exports = route;
