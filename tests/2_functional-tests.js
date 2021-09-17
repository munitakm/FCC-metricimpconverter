const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('Route test', () => { 
    suite('GET /api/convert', () => { 
      test('Convert a valid input',(done) => { 
        chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err,res)  { 
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done()
        }) 
      })
      test('Convert a invalid input(unit)', (done) => { 
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end((err,res) => { 
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid unit');
          done();
          })
      })
      test('Convert a invalid input(number)', (done) => { 
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end((err,res) => { 
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number');
          done();
          })
      })
      test('Convert a invalid input(number and unit)', (done) => { 
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegaram'})
        .end((err,res) => { 
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number and unit');
          done();
          })
      })
      test('Convert a valid input without num',(done) => { 
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err,res)  { 
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done()
        }) 
      })
    })
  })
});
