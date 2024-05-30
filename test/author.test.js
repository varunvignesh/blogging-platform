const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from index.js
const { CREATED } = require('../localization/en.json')

async () => {
    const chai = await import('chai');
    const expect = chai.expect;
    describe('POST /api/v1/authors', () => {
        it('should create a new author', (done) => {
            request(app)
                .post('/api/v1/authors')
                .send({
                    "name": "Navya",
                    "email_id": "navya@demo.com",
                    "password": "password",
                    "designation": "Intern"
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('author_id');
                    expect(res.body).to.have.property('name', "Navya");
                    expect(res.body).to.have.property('email_id', "navya@demo.com");
                    expect(res.body).to.have.property('message', CREATED);
                    done();
                });
        });
    });

    // Run Mocha manually since we're using dynamic import
    if (typeof run === 'function') {
        run();
    }
}