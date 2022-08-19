const express = require('express');
const { sequelize, Users } = require('./models');
require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const schema = Joi.object({

    name: Joi.string().trim().required().min(3).max(15),
    surname: Joi.string().trim().required().min(3).max(20),
    username: Joi.string().trim().required().min(3).max(15),
    email: Joi.string().trim().required().min(6).max(35).email(),
    password: Joi.string().trim().required().min(4).max(20),
    gender: Joi.string().trim().required().valid('Male','Female','Other')

});

const app = express();

var corsOption = {

    origin:'*',          
    optionSuccessStatus:200

}

app.use(express.json());
app.use(cors(corsOption));


app.post('/login',(req,res)=>{

                    
    Users.findOne({where:{username:req.body.username}})
        .then(row => {


            if(bcrypt.compareSync(req.body.password,row.password)){

                const obj = {
                    userId : row.id,
                    username: row.username
                }

                const token = jwt.sign(obj,process.env.ACCESS_TOKEN_SECRET);
                res.json({token:token});

            }else{
                res.status(400).json({msg:'Invalid credentials'});
            }

        })
        .catch(err => res.status(500).json({msg:'Invalid credentials'}));

});

app.post('/register',(req,res)=>{


    const  user = {
        name: req.body.name,   
        surname:req.body.surname,
        username:req.body.username,
        email:req.body.email,
        password: req.body.password,
        gender:req.body.gender
        
    };

    const {error,value} = schema.validate(user);

    if(!error){
        user.password = bcrypt.hashSync(req.body.password,10);
        user.isAdmin = false;
        user.isModerator = false;

        Users.create(user)
        .then(row => {

            const object = {
                userId : row.id,
                username: row.username
            }

            const token = jwt.sign(object,process.env.ACCESS_TOKEN_SECRET);
            res.json({token:token});

        })
        .catch(err => res.status(500).json({msg: 'Invalid credentials'}));


    }else{
        res.status(500).json({msg: 'Invalid credentials'});
    }

})

app.listen({port:8888},async() => {

    await sequelize.authenticate();
    console.log('Auth aplikacija');

});

