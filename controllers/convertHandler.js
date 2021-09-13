function ConvertHandler(str) {
  
  const units = /km|mi|kg|lbs|l|gal/i;
  const ind = str.match(/[a-zA-Z]/i)

    this.getNum = function() {
      let number = 1;
      if(ind == null) {
          number = str;
        if((/\//).test(number) && number.match(/\//g).length == 1) {
            return isFraction(number);
        } else {
            return isNumber(number);
        }
      } else if (ind.index > 0){
          number = str.slice(0, ind.index);
          if((/\//g).test(number) && (number).match(/\//g).length == 1) {
              return isFraction(number)
          } else {
              return isNumber(number);
          }
      } else {
          return number;
      }
    }  
  
const isFraction = (n) => {
    let ind = n.indexOf("/");
    let a = n.slice(0, ind);
    let b = n.slice(ind+1);
    if(isNumber(a) && isNumber(b)) {
    if(a > 0 && b > 0) return a/b;
    return false;
    } 
}

const isNumber = (m) => {
    if(!m.match(/\./) || m.match(/\./g).length == 1) { 
        if(parseFloat(m) && m > 0)
        return parseFloat(m);
    } else {
    return false;
    }
};       
    this.getUnit = function() {
      if(ind == null) { 
        return false
      } else { 
        let unit = str.slice(ind.index);
        if(unit == "l" || unit == "L") return "L"
        if (unit.match(units) == unit) return unit.toLowerCase();
        if(unit.match(units) !== unit) return false;
      }
    }

  this.getReturnUnit = function() {
    switch(this.getUnit()) { 
      case "gal": return "L";
        break;
      case "L" : return "gal";
        break;
      case "mi": return "km";
        break;
      case "km": return "mi";
        break;
      case "lbs": return "kg";
        break;
      case "kg": return "lbs";
        break;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit) { 
      case "mi": return "miles";
        break;
      case "km": return "kilometers";
        break;
      case "lbs": return "pounds";
        break;
      case "kg": return "kilograms";
        break;
      case "gal": return "gallons";
        break;
      case "L": return "liters"
    }
  };
  
  this.convert = function(initNum = this.getNum(), initUnit = this.getUnit()) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit) { 
    case "gal": return initNum * galToL;
        break;
    case "L": return initNum/galToL;
        break;
    case "lbs": return initNum * lbsToKg;
        break;
    case "kg": return initNum/lbsToKg;
        break;
    case "mi": return initNum *  miToKm;
        break;
    case "km": return initNum / miToKm;
        break;
    }
  };
  
  this.getString = function(initNum=this.getNum(), initUnit=this.getUnit(),
  returnNum=this.convert(), returnUnit=this.getReturnUnit()) {
    
    if(!initNum && !initUnit) return 'invalid number and unit';
    if(!initUnit) return "invalid unit";
    if(!initNum) return "invalid number";
    
    returnNum = parseFloat(returnNum.toFixed(5));

    let string = 
      `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`; 

    return {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: string
      }
  };
 }

module.exports = ConvertHandler;
