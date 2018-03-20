let express = require('express'); 
let app = express(); 
// const PORT = 4001; 
//left: for heroku - right: else
const PORT = process.env.PORT || 4001;
const gameRouter = require('./routes/game.router.js'); 

//MONGODB CODE -- START
const mongoose = require('mongoose'); 
//connect to mongodb on port 27017 with db of hadar 
const databaseUrl = 'mongodb://localhost:27017/hadar'; 

mongoose.connect(databaseUrl); //<-- actually connect to databse

//below: EVENT HANDLERS for connection and failure to connect to mongodb
mongoose.connection.on('connected', () => {
    console.log('conneted to mongodb!!');
})
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongodb', err); 
})


let bodyParser = require('body-parser'); 


//configures the bodyParser for jQuery 
//MUST BE PUT BEFORE APP.POST
app.use(bodyParser.urlencoded({extended: true}));



//set up gameRouter
app.use('/game', gameRouter); 

//Server static files
app.use(express.static('server/public')); 







//spin up the server
app.listen(PORT, () => {
    console.log('server is running on port' + PORT);
    
})

