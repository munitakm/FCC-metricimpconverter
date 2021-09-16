'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler;
module.exports = function (app) {
  app.route('/api/convert')
  .get((req,res) => { 
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if(!initUnit && !initNum) return res.send("invalid number and unit");
    if(!initNum) return res.send("invalid number");
    if(!initUnit) return res.send("invalid unit");
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    console.log(input);
    res.json(string);
  })
};
