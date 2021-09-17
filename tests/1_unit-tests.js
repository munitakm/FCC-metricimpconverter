const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let c = new ConvertHandler();

suite('#1 Unit Tests', function(){
  suite('Number tests', function() { 
    test('Read a whole number input', (done) => { 
      const num = "2km";
      assert.equal(c.getNum(num), 2);
      done();
    })
    test('#2 Read a decimal number', (done) =>{ 
    const num = "2.56lbs";
      assert.equal(c.getNum(num), 2.56);
      done() 
    })
    test('#3 Read a fractional input', (done) => { 
    const num = "1/2mi";
      assert.equal(c.getNum(num), 0.5);
      done();
    })
    test('#4 Read a fractional input with decimal', (done) => { 
    const num = "3.5/0.5gal";
      assert.equal(c.getNum(num), 7);
      done();
    })
    test('#5 Return error with double fraction', (done) => { 
    const num = "1.5/2/3km";
      assert.equal(c.getNum(num), null);
      done();
    })
    test('#6 Return 1 when no number is provided', (done) => { 
    const num = "km";
      assert.equal(c.getNum(num), 1);
      done();
    })
  });

  suite('Unit Tests', function() { 
    test('#7 Should read correctly each valid input unit', (done) => { 
    const unit = ['km','KM','mi','MI','kg','KG','LBS','lbs','GAL','gal'];
    const vol = ['l', 'L'];
      unit.forEach((el) => { 
        assert.equal(c.getUnit(el), el.toLowerCase());
      })
      vol.forEach((el) => { 
        assert(c.getUnit(el), 'L')
      })
      done();
    })
    test('#8 Return error when input unit is invalid', (done) => { 
    const num = "1.5/2kjo";
      assert.equal(c.getUnit(num), null);
      done();
    })
    test('#9 Should return the spelled unit for each valid input unit', (done) => { 
    const units = ['km','mi','kg','lbs','l','gal'];
    const expectedSpelled =
    ['kilometers','miles','kilograms','pounds','liters','gallons'];
      for(let i = 0; i < units.length; i++) { 
        assert.equal(c.spellOutUnit(c.getUnit(units[i])), expectedSpelled[i])
      }
      done();
    })
    test('#10 Should return the espelled unit for each converted input unit ', 
    (done) => { 
    const units = ['km','mi','kg','lbs','l','gal'];
    const spelled = 
    ['miles','kilometers','pounds','kilograms','gallons','liters']
      for(let i = 0; i < units.length; i++) { 
        assert.equal(c.spellOutUnit(c.getReturnUnit(units[i])), spelled[i])
      }
      done();
    }) 
  });

  suite('Conversion Tests', function() {
    test('#11 Should convert gal to L', (done) => { 
      assert.approximately(c.convert(1, "gal"), 3.78541, 0.1);
      done();
    })
    test('#12 Should convert L to gal', (done) => { 
      assert.approximately(c.convert(1, "L"), 0.26417, 0.1);
      done();
    })
    test('#13 Should convert mi to km', (done) => { 
      assert.approximately(c.convert(1, "mi"), 1.60934, 0.1);
      done();
    })
    test('#14 Should convert km to mi', (done) => { 
      assert.approximately(c.convert(1, "km"), 0.62137, 0.1);
      done();
    })
    test('#15 Should convert lbs to kg', (done) => { 
      assert.approximately(c.convert(1, "lbs"), 0.45359, 0.1);
      done();
    })
    test('#16 Should convert kg to lbs', (done) => { 
      assert.approximately(c.convert(1, "kg"), 2.20462, 0.1);
      done();
    })
  })
});
