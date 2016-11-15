var apiKey = "<APIKEYHERE>";
var urlUser = "http://api.steampowered.com/ISteamUser/";
var express = require('express');
var request = require('request');
var app = express();

app.use(express.static('./'));

app.get('/steamid/:playerName', function(req, res){
    if(!req.params.playerName){
        res.status(500);
        res.send({"Error" : "Player name required!"});
        console.log("Provide a player name on your request!");
    }
    request.get({url: urlUser + "ResolveVanityUrl/v0001/?key=" +
        apiKey + "&vanityurl=" + req.params.playerName, json: true},
        function(error, response, body){
            if(!error && response.statusCode == 200)
                res.send(body);
        })
});

app.get('/profiles', function(req, res){
    if(!req.query.ids){
        res.status(500);
        res.send({"Error" : "Steam id(s) required!"});
        console.log("Provide a steam id(s) on your request!");
    }
    request.get({url: urlUser + "GetPlayerSummaries/v0002/?key=" +
        apiKey + "&steamids=" + req.query.ids, json: true},
        function(error, response, body){
            if(!error && response.statusCode == 200)
                res.send(body);
        })
});

app.get('/', function(req, res){
    res.sendFile('./index.html');
});

var server = app.listen('8081', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});