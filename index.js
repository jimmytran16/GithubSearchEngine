const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require('./dateutils/Date');
const submitRouter = require('./routes/submit');
const homeRouter = require('./routes/home');
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); //require the .env file if the ennviroment is not in production
}

const PORT = process.env.PORT;  

app.set('views',path.join(__dirname,"views")); //set the views directory
app.use(express.static('public')); //set the static folder to be under 'public'
app.set('view engine','ejs') //set the app to use the ejs view template engine

//Middleware
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//Route handlers 
app.use('/',homeRouter);
app.use('/submit',submitRouter);

app.listen(PORT, ()=>{console.log(`Connection to PORT ${ PORT } http://localhost:${ PORT }`)});
