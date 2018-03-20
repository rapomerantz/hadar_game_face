let express = require('express');
let router = express.Router(); 
let mongoose = require('mongoose'); 
// const gameCollection = []; //contains objects {name: 'game name', cost: 0.99}


let Schema = mongoose.Schema; 


let gameSchema = new Schema ({
    name: {type: String},
    cost: {type: Number},
    isClearance: {type: Boolean},
});

let Game = mongoose.model('Game', gameSchema); 

//send back all the games 
router.get('/', (req, res) => {
    console.log('GET games');
    Game.find({}, (err, foundGames) => {
        if (err) {
            console.log('mongodb error', err);
            res.sendStatus (500); 
        }
        else {
            console.log('RETURNED GAME LIST: ', foundGames); 
            res.send(foundGames); 
        }
    })    
});

//when we want to add a new game
router.post('/', (req, res) => {
    console.log(req.body); 
    let gameToAdd = req.body; //properties of body.name & body.cost
    let gameName = gameToAdd.name; 
    let gameCost = parseFloat(gameToAdd.cost); 
    gameToAdd.isClearance = isClearance(gameCost); 
    isClearance(gameCost); 
    console.log(gameToAdd);
    let gameToStore = new Game (gameToAdd);
    gameToStore.save((err, savedGame) => {
        if (err) {
            console.log('mongodb error', err);
            res.sendStatus(500); 
        }
        else {
            console.log('Saved game: ', savedGame);
            res.sendStatus(201);   
        }
    })
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


module.exports = router; 