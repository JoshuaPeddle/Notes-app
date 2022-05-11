

var chai = require('chai');
var chaiHttp = require('chai-http');

const serverURL = 'http://localhost:3000'

chai.use(chaiHttp);
chai.should();



describe('Notes app - Integration Tests with Mocha', function () {

	/** Integration tests for Api calls */
	describe('Test API calls - individual', function () {


		it('GET / - Should return Login page', function (done) {
			chai.request(serverURL)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					res.type.should.equal('text/html');
					// Ensure page contains strings expected the login page
					res.text.should.have.string('login');
					res.text.should.have.string('signup');
					done();

				});
		});

		it('POST /signup - ', function (done) {
			chai.request(serverURL)
				.post('/signup')
				.send({ 'username': '12345678', 'password': 'test' })
				.end((err, res) => {
					res.should.have.status(200);
					res.type.should.equal('text/html');		
					done();
				});
		});


		it('DELETE /users - Delete a user', function (done) {
			chai.request(serverURL)
				.delete('/users')
				.send({ 'username': '12345678' })
				.end((err, res) => {
					res.should.have.status(200);
					res.text.should.be.oneOf(['User does not exist', 'OK']);
					done();
				});
		});

		it('Multi - DELETE /users POST /singup  GET /notes',  function (done) {
			this.timeout(5000);
			// Using chai's agent here to maintain login cookie throughout request
			var agent = chai.request.agent(serverURL);
			agent.delete('/users')
				.send({ 'username': '123456789' })
				.then(function (res) {
					res.should.have.status(200);
					res.text.should.be.oneOf(['User does not exist', 'OK']);
					agent.post('/signup')
						.send({ 'username': '123456789', 'password': 'test123' })
						.end((err, res) => {
							res.should.have.status(200);
							res.text.should.have.string('<!DOCTYPE html>');
							agent.get('/notes')
								.end((err, res) => {
									res.should.have.status(200);
									res.text.should.be.oneOf(['No notes found', 'OK']);
									done();
								});	
						});
				});	
		});


		it('Multi - DELETE /users POST /singup POST / GET /notes',  function (done) {
			this.timeout(5000);
			// Using chai's agent here to maintain login cookie throughout request
			var agent = chai.request.agent(serverURL);
			agent.delete('/users')
				.send({ 'username': '12345678' })
				.then(function (res) {
					res.should.have.status(200);
					res.text.should.be.oneOf(['User does not exist', 'OK']);
					agent.post('/signup')
						.send({ 'username': '12345678', 'password': 'test' })
						.end((err, res) => {
							res.should.have.status(200);
							res.text.should.have.string('<!DOCTYPE html>');
							agent.post('/')
								.send({ 'title': '12345678', 'body': 'test121' })
								.end((err, res) => {
									res.should.have.status(200);
									res.body.should.have.own.include({was_successful: true});
									agent.get('/notes')
										.end((err, res) => {
											res.should.have.status(200);
											done();
										});	
								});	
						});
				});	
		});
	});	
});

