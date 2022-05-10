

var chai = require('chai');
var chaiHttp = require('chai-http');



chai.use(chaiHttp);
chai.should();



describe('Notes app - Integration Tests with Mocha', function () {

    /** Integration tests for Api calls */
    describe('Test API calls - individual', function () {

        it('GET / - Should return Login page', function (done) {
            chai.request('http://localhost:3000')
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.equal('text/html');
                    // Ensure page contains strings expected the login page
                    res.text.should.have.string('login');
                    res.text.should.have.string('signup');
                    console.log('GET / done');
                    done();

                });

        });

        it('POST /signup - ', function (done) {
            chai.request('http://localhost:3000')
                .post('/signup')
                .send({ 'username': '12345678', 'password': 'test' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.equal('text/html');
                    console.log('POST /signup done');
                    done();
                });
        });

        it('DELETE /users - Delete a user', function (done) {
            chai.request('http://localhost:3000')
                .delete('/users')
                .send({ 'username': '12345678' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.oneOf(['User does not exist', 'OK']);
                    done();
                });
        });
    });
});

