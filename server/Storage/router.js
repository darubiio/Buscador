const express = require('express');
const Router = express.Router();
const path = require('path');
const fs = require('fs');

Router.get('/data', (req, res) =>{
  let reqPath = path.join(__dirname, '../Storage/data.json');
  fs.readFile(reqPath, 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.json(obj);
  });
});
module.exports = Router;
