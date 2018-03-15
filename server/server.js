let express = require('express'); 
let app = express(); 
const PORT = 4001; 

//Server static files
app.use(express.static('server/public')); 

//spin up the server
app.listen(PORT, () => {
    console.log('server is running on port' + PORT);
    
})

