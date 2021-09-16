function ConvertHandler() {
    
  const units = { 
    gal: ["gallons", "L", 3.78541],
    l: ["liters", "gal", 1/3.78541],
    L: ["liters", "gal", 1/3.78541],    
    kg: ["kilograms", "lbs", 1/0.453592],
    lbs: ["pounds", "kg", 0.453592],
    mi: ["miles", "km", 1.60934],
    km: ["kilometers", "mi", 1/1.60934]
  }
  
  this.getNum = (input) => {
    input = input.match(/[^a-z]/gi) || 1;
    return input !== 1? fraction(input) : 1;
  };
  
  const fraction = (input) => {
    if((/\//).test(input)) {
      input = input.join('').split('/');
      return input.length == 2 && input[1] && input[0][input[0].length-1] !== "."?
      input.reduce((a,b) => a / b) : null;
    } else { 
      return input.join('')
    }
  }
  this.getUnit = function(input) {
    input = input.toLowerCase().match(/[a-z]/gi) || "";
    return input ? input == "l" ? "L" : Object.keys(units).includes(input.join("")) ?
      input.join("") :
      null :
      null;
    
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = this.getUnit(initUnit)
    return units[initUnit][1]
  };

  this.spellOutUnit = function(unit) {
    unit = this.getUnit(unit)
    return units[unit][0]
  };
  
  this.convert = function(initNum, initUnit) {
    return units[initUnit][2] * initNum;
  };
  

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    returnNum = returnNum.toFixed(5)
    return { 
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }
  };
};

module.exports = ConvertHandler;
