  
const express = require('express');
const leaguesRouter = express.Router();
var fs = require('fs');

leaguesRouter.get('/', function(request, response) {
    response.render('leagues', { title: 'leagues' });
});

leaguesRouter.get('/data', function(request, response) {
    try{
        response.end(fs.readFileSync("./data/leagues.json"));
    }
    catch(err) {
        response.end("[]");
    }
});

module.exports = leaguesRouter;