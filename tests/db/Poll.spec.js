const expect = require('chai').expect;
const { Poll, User, Choice, Vote } = require('../../db/models');
const { db } = require('../../db');


describe('Poll database model', () => {
    const userData = {
        firstName: 'Bob',
        lastName: 'Smith',
        age: 22,
        imgUrl: 'https://m.media-amazon.com/images/M/MV5BODAyMGNkNWItYmFjZC00MTA5LTg3ZGItZWQ0MTIxNTg2N2JmXkEyXkFqcGdeQXVyNDQzMDg4Nzk@._V1_.jpg',
        email: 'bobsmith@email.com',
        password: 'P@ssword1'
    };
    let user;
    beforeEach(async () => {
        await db.sync({ force: true })
        const createdUser = await User.create(userData);
        user = createdUser.dataValues;
    })
    it('Can create a poll', done => {
        Poll.create({
            text: 'This is a test poll question',
            userId: user.id
        })
            .then(poll => {
                expect(poll.text).to.equal('This is a test poll question');
                expect(poll.userId).to.equal(user.id);
                done();
            })
            .catch(e => done(e));
    });
});
