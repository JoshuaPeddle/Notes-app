

var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


process.env.MONGODB_CONNSTRING = 'mongodb://localhost';
process.env.DBNAME = 'notesapp-dev';

const app = require('../app.js');



describe('Notes app - Tests with Mocha', function () {



    /** Tests for Api calls */
    describe('Test API calls', function () {

        it('GET /', function (done) {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.equal('text/html');
                    done();
                });
        });
    });


    /** Integration tests for Api calls */
    describe('Test API calls', function () {

        it('GET /', function (done) {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.equal('text/html');
                    done();
                });
        });
    });




});
