'use strict';

const chai = require('chai');
const expect = chai.expect;
const app = require('../../server').app;
const agent = require('supertest')(app);
const { User, db } = require('../../db');


describe('User Routes', () => {
    let userMap;
    const userData = [
        {
            firstName: 'Bob',
            lastName: 'Smith',
            age: 22,
            imgUrl: 'https://m.media-amazon.com/images/M/MV5BODAyMGNkNWItYmFjZC00MTA5LTg3ZGItZWQ0MTIxNTg2N2JmXkEyXkFqcGdeQXVyNDQzMDg4Nzk@._V1_.jpg',
            email: 'bobsmith@email.com',
            password: 'P@ssword1'
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            age: 35,
            imgUrl: 'https://m.media-amazon.com/images/M/MV5BODAyMGNkNWItYmFjZC00MTA5LTg3ZGItZWQ0MTIxNTg2N2JmXkEyXkFqcGdeQXVyNDQzMDg4Nzk@._V1_.jpg',
            email: 'janedoe@email.com',
            password: 'P@ssword1'
        },
    ];

    beforeEach(async () => {
        await db.sync({ force: true });
        const createdUsers = await User.bulkCreate(userData);
        userMap = createdUsers.map(user => user.dataValues);
    });
    describe('GET api/users', () => {
        it('sends all users', async () => {
            const response = await agent
                .get('/api/users')
                .expect(200);
            expect(response.body).to.have.length(2);
            expect(response.body[0].firstName).to.equal(userMap[0].firstName);
        });
    });
    describe('GET api/users/:id', () => {
        it('sends a specific user by their id', async () => {
            console.log(userMap[1].id)
            const response = await agent
                .get(`/api/users/${userMap[1].id}`)
                .expect(200);
            expect(response.body.firstName).to.equal(userMap[1].firstName);
        })
    })
});

