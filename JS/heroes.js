const heroesFolder = '../Pictures/Heroes/';
let http = require('http');
let fs = require('fs');
const express = require('express');
const cors = require('cors');
const heroes = express();

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    fs.readdirSync(heroesFolder).forEach(element => {
        response.write(element);
        response.write("\n");
    });
    response.end();

    heroes.use(cors({
        origin:['http://localhost:5500','http://127.0.0.1:5500'],
        credentials:false
    }));
    
    heroes.use(function (req, res, next) {
    
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', true);
        res.header('Access-Control-Allow-Credentials', 'Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });
};

http.createServer(handleRequest).listen(9000);