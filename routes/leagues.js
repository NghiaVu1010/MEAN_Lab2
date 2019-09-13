// These are modules that are installed from NPM and are imported into this file
const express = require('express');
const leaguesRouter = express.Router();
var fs = require('fs');

// GET leagues page and render it
// http://localhost:3000/leagues
leaguesRouter.get('/', function(request, response) {
    response.render('leagues', { title: 'leagues' });
});

// GET data and display
// http://localhost:3000/leagues/data
leaguesRouter.get('/data', function(request, response) {
    try {
        response.end(fs.readFileSync("./data/leagues.json"));
    }
    catch(err) {
        response.end("[]");
    }
});

module.exports = leaguesRouter;