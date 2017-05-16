process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);

var testInput = {
	first_name: 'test_first',
	last_name: 'test_last',
	address: 'test_address',
	contact_number: 'test_number',
	email_address: 'test_email'
}

describe('POST /api/contacts', function(){
        it('should CREATE and ADD a SINGLE NEW user ', function(done){
            var input = testInput;
            chai.request(server)
                .post('/api/contacts')
                .send(input)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    createdUser=res.body.user;
                    res.body.should.be.a('object');
                    res.body.user.should.be.a('object');
                    res.body.user.should.have.property('first_name');
                    res.body.user.should.have.property('last_name');
                    res.body.user.should.have.property('address');
                    res.body.user.should.have.property('contact_number');
                    res.body.user.should.have.property('email_address');
                    res.body.user.first_name.should.equal(input.first_name);
                    res.body.user.last_name.should.equal(input.last_name);
                    res.body.user.address.should.equal(input.address);
                    res.body.user.contact_number.should.not.equal(input.contact_number);
                    res.body.user.email_address.should.not.equal(input.email_address);
                    done();
                });
        });
    });