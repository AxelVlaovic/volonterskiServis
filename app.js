const express = require('express');
const {sequelize , User_Suggestions , Users} = require('./models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const Joi = require('joi');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const { Server } = require("socket.io");
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET','POST'],
        credentials: true

     },

     allowEIO3: true

});

var corsOption = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOption));

const schema = Joi.object({
                        
    userId: Joi.number().integer(), 
    name: Joi.string().trim().required().min(3).max(30),
    purpose: Joi.string().trim().required().min(15).max(250),
    location: Joi.string().trim().required().min(3).max(55),
    description: Joi.string().trim().required().min(5).max(250),
    role: Joi.string().trim().required().min(15).max(250) 

});  

function getCookies(req){

    if(req.headers.cookie == null) return {};

    const rawCookie = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookie.forEach(el => {
        
        const pc = el.split("=");
        parsedCookies[pc[0]] = pc[1]; 

    });

    return parsedCookies;

}; 

function authToken(req,res,next){


    const cookies = getCookies(req);
    const token = cookies['token'];

    if(token == null) {
       res.redirect(301,'/adminLogin');
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

        if (err) return res.redirect(301, '/adminLogin');

        Users.findOne({where:{id:user.userId}})
        .then(row => {

           if(row!=null){ 
           
                if((row.isAdmin==true) || (row.isModerator==true)){

                req.user = user;
                next();

                }else{
                    res.redirect(301,'/adminLogin');    
                }
        
            }
            else{
                res.redirect(301,'/adminLogin');
            }
            
        })
        .catch(err => res.redirect(301,'/adminLogin'));

    });
    
}

io.on('connection',socket=>{

    socket.on('suggestion', msg=> {

        if(msg.token == null){

        }else{
            jwt.verify(msg.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    next(new Error(err));
                } else {
                    
                    suggestion = {
                        userId: user.userId,
                        name: msg.suggestion.name,
                        purpose: msg.suggestion.purpose,
                        location: msg.suggestion.location,
                        description: msg.suggestion.description,
                        role: msg.suggestion.role

                    }

                    const {error,value} = schema.validate(suggestion);

                    if(!error){

                     Users.findOne({where:{id:suggestion.userId}})
                        .then(user => {

                                if(user!=null && ((!user.isAdmin && !user.isModerator))){
                                    User_Suggestions.create(suggestion)
                                        .then(row => {
                                            User_Suggestions.findOne({where:{id:row.id},include:['user']})
                                                    .then(final => io.emit('suggestion',JSON.stringify(final)));
                                        })
                                    
                                }
                        })

                    }

                }
            });

        }

    })

    socket.on('error', err => socket.emit('error',err.message))

})

app.get('/admin',authToken,(req,res)=>{
    res.sendFile('main_page.html',{root:'./static'});
});

app.get('/suggestions.html',authToken,(req,res)=>{
    res.sendFile('suggestions.html',{root:'./static'});
})

app.get('/activities.html',authToken,(req,res)=>{
    res.sendFile('activities.html',{root:'./static'});
})

app.get('/relations.html',authToken,(req,res)=>{
    res.sendFile('relations.html',{root:'./static'});
})

app.get('/users.html',authToken,(req,res)=>{
    res.sendFile('users.html',{root:'./static'});
})

app.get('/main_page.html',authToken,(req,res)=>{
    res.sendFile('main_page.html',{root:'./static'});
})

app.get('/adminLogin',(req,res)=>{
    res.sendFile('login.html',{root: './static'});
});

const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({index: '/index.html'}));

app.use(staticMdl);

app.use(express.static(path.join(__dirname,'static'))); 


server.listen({port: process.env.PORT || 7777},async()=>{

    await sequelize.authenticate();

});

