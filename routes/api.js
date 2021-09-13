'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
module.exports = function (app) {
  app.route('/api/convert')
  .get((req,res) => { 
    const convertHandler = new ConvertHandler(req.query.input)
    console.log(req.query.input)
    console.log(convertHandler.getString())
    res.send(convertHandler.getString())
  })
};
