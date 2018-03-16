let express = require('express'); 
let app = express(); 
const PORT = 4001; 
let bodyParser = require('body-parser'); 
const gameCollection = []; //contains objects {name: 'game name', cost: 0.99}


//configures the bodyParser for jQuery 
//MUST BE PUT BEFORE APP.POST
app.use(bodyParser.urlencoded({extended: true}));


//Server static files
app.use(express.static('server/public')); 


//send back all the games 
app.get('/game', (req, res) => {
    res.send(gameCollection); 
});

//when we want to add a new game
app.post('/game', (req, res) => {
    console.log(req.body); 
    let gameToAdd = req.body; //properties of body.name & body.cost
    let gameName = gameToAdd.name; 
    let gameCost = parseFloat(gameToAdd.cost); 
    gameToAdd.isClearance = isClearance(gameCost); 
    isClearance(gameCost); 
    console.log(gameToAdd);
    gameCollection.push(gameToAdd); 
    console.log(gameCollection);
    
    res.sendStatus(200); //<---- success status code 

});

function isClearance(cost) {
    //19.99 or 19.00?? 
    //19.99 - 19 = .99
    //19.00 - 19 = 0
    if (cost - Math.floor(cost) === 0) {
        return true; 
    }  
    else {
        return false; 
    }   
}; 


//spin up the server
app.listen(PORT, () => {
    console.log('server is running on port' + PORT);
    
})

