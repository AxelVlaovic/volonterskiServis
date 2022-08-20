const express = require('express');
const {Users, Activities , Users_Activities , Sequelize } = require('../models');
//const {Users,Activities,Users_Activities,Sequelize} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

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

route.get('/test',(req,res)=>{

    Users_Activities.findAll({include:['users','activities']})              
    .then(rows => res.json(rows))
    .catch(err => res.status(500));

});

route.get('/users_activities',authToken,(req,res)=>{  
    
    Users_Activities.findAll({include:['users','activities']})              
        .then(rows => res.json(rows))
        .catch(err => res.status(500));


});

route.get('/users_activities/:id',authToken,(req,res)=>{

    Users_Activities.findOne({where:{id:req.params.id},include:['users','activities']})
        .then(row => res.json(row))
        .catch(err => res.status(500).json(null));

});

route.get('/relations_user/:id',authToken,(req,res)=>{

    Users_Activities.findAll({where:{userId:req.params.id},include:['activities']}) 
        .then(rows => res.json(rows)) 
        .catch(err => res.status(500).json(null));

})

route.get('/relations_activity/:id',authToken,(req,res)=>{

    Users_Activities.findAll({where:{activityId:req.params.id},include:['users']})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(null));

})

route.get('/relations_api',authToken,(req,res)=>{  
    
    Users_Activities.findAll({include:['users']})              
        .then(rows => res.json(rows))
        .catch(err => res.status(500));


});

route.get('/user_relations_api',authToken,(req,res)=>{

    Users_Activities.findAll({where:{userId:req.user.userId}}) 
        .then(rows => res.json(rows)) 
        .catch(err => res.status(500).json({msg: 'ne moze'}));

})

route.get('/relations_activity_single/:id',authToken,(req,res)=>{

    Users_Activities.findAll({where:{activityId:req.params.id , userId:req.user.userId},include:['users']})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(null));

})

route.post('/relations_activity_post/:id',authToken,(req,res)=>{

    const  userActivity = {
        userId:req.user.userId,
        activityId:req.params.id
    };

    Users_Activities.findOne({where:{userId:userActivity.userId,activityId:userActivity.activityId}})
        .then(relation => {

        if(relation == null){

            Users.findOne({where:{id:userActivity.userId}})
                .then(user => {
            
            if(user!=null && (!user.isAdmin && !user.isModerator)){

            Activities.findOne({where:{id:userActivity.activityId}})
                .then(activity => {

                    if(activity!=null){

                    Users_Activities.create(userActivity)
                        .then(row => {

                            Users_Activities.findOne({where:{id:row.id},include:['users']})
                                .then(row => res.json(row))
                                .catch(err => res.status(500).json(null));

                        })
                        .catch(err => res.status(500).json(null));

                    }else{
                        res.status(500).json(null);
                    }

                })
                .catch(err => res.status(500).json(null));

            }else{
                res.status(500).json(null);
            }


        })
        .catch(err => res.status(500).json(null));

        }else{
            res.status(500).json(null);
        }

    })
    .catch(err => res.status(500));

});

route.delete('/users_activities_single/:id',authToken,(req,res)=>{


    const  userActivity = {
        userId:req.user.userId,
        activityId:req.params.id
    };

    Users_Activities.findOne({where:{userId:userActivity.userId,activityId:userActivity.activityId}})
        .then(relation => {

            relation.destroy()
                        .then(row => res.json(row))
                        .catch(err => res.status(500).json(null));

    })
    .catch(err => res.status(500));

});

route.post('/users_activities',authToken,(req,res)=>{

    const  userActivity = {
        userId:req.body.userId,
        activityId:req.body.activityId
    };

    Users_Activities.findOne({where:{userId:userActivity.userId,activityId:userActivity.activityId}})
        .then(relation => {

        if(relation == null){

            Users.findOne({where:{id:userActivity.userId}})
                .then(user => {
            
            if(user!=null && (!user.isAdmin && !user.isModerator)){

            Activities.findOne({where:{id:userActivity.activityId}})
                .then(activity => {

                    if(activity!=null){

                    Users_Activities.create(userActivity)
                        .then(row => res.json(row))
                        .catch(err => res.status(500).json(null));

                    }else{
                        res.status(500).json(null);
                    }

                })
                .catch(err => res.status(500).json(null));

            }else{
                res.status(500).json(null);
            }


        })
        .catch(err => res.status(500).json(null));

        }else{
            res.status(500).json(null);
        }

    })
    .catch(err => res.status(500));

});

route.delete('/users_activities/:id',authToken,(req,res)=>{

    Users_Activities.findOne({where:{id:req.params.id}})     
        .then(usr => {

            usr.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500));
        })    
        .catch(err => res.status(500).json(null));

});

route.put('/users_activities/:id',authToken,(req,res)=>{

        Users_Activities.findOne({where:{id:req.params.id}})
            .then(link =>{

                if(link != null){
                                    
                            Users_Activities.findOne({where:{userId:req.body.userId,activityId:req.body.activityId}})
                                 .then(relation => {

                                if(relation == null){

                                    Users.findOne({where:{id:req.body.userId}})
                                        .then(user => {

                                        if(user!=null){

                                        Activities.findOne({where:{id:req.body.activityId}})
                                            .then(activity => {

                                            if(activity!=null){

                                                    link.userId = req.body.userId;
                                                    link.activityId = req.body.activityId;

                                                    link.save()
                                                        .then(finish => res.json(finish))
                                                        .catch(err => res.status(500).json(null))

                                            }else{
                                                res.status(500).json(null);
                                            }

                                        })
                                        .catch(err => res.status(500).json(null));

                                    }else{
                                        res.status(500).json(null);
                                    }

                                })
                                .catch(err => res.status(500).json(null));

                        }else{
                            res.status(500).json(null);
                        }

                    })
                    .catch(err => res.status(500));

                }else{
                    res.status(500).json(null);
                }

            })
            .catch(err => res.status(500).json(null));


});

module.exports = route;