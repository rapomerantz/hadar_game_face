$(document).ready(readyNow); 

function readyNow () {
    console.log('document ready');
    $('#submitButton').on('click', submitGame); 
    //person access the page & it immediatly loads all games ~ don't need to add a game to see the list
    getAllGames() 
    
}

function getAllGames() {
    $.ajax({
        type: 'GET', 
        url: '/game'
    }).done(function(response){
        appendToDom(response); //the response is our gameCollection array 

    })
}

function appendToDom (gameCollection) {
    $('#gameContent').empty()
    for (let game of gameCollection) {
        console.log('in appendToDom, GAME:', game); 
        let tr = $('<tr></tr>');
        tr.append('<td>' + game.name + '</td>');
        tr.append('<td>' + game.cost + '</td>'); 
        $('#gameContent').append(tr); 
    }

}


function submitGame () {
    let gameName = $('#gameName').val(); 
    let cost = $('#cost').val(); 
    let gameToSend = {name: gameName, cost: cost}; 
    $.ajax({
        type: 'POST',
        data: gameToSend, 
        url: '/game'

    }).done(function(response){
        //response from a POST will just be '200' success
        //the .done functionw WILL NOT RUN until a response comes back from the server 
        console.log('SUCCESS');
        getAllGames(); 
        //based on the status code from the server, AJAX knows which function to call (done vs. fail)

    }).fail (function(response) {
        //this is an if/else jQuery is running based on the status code 
        alert('Something went wrong...'); 

    })
}

