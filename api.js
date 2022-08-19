const express = require('express');
const {sequelize} = require('./models');
const UserApi = require('./routes/Users');
const ActivityApi = require('./routes/Activities');
const Users_ActivitiesApi = require('./routes/Users_Activities');
const User_Suggestions = require('./routes/User_Suggestions');
const cors = require('cors');

const corsOption = {
    origin:'https://volonterskiapp.herokuapp.com/',
    optionSuccessStatus:200,
    credentials: true
}


const app = express();
app.use(cors(corsOption));

app.use('/api',UserApi);
app.use('/api',ActivityApi)
app.use('/api',Users_ActivitiesApi);
app.use('/api',User_Suggestions);

app.listen({port: process.env.PORT || 5000},async() => {
    await sequelize.authenticate();
    console.log('Api aplikacija');
});

