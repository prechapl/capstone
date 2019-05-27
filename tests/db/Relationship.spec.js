const expect = require('chai').expect();
const { Relationship } = require('../../db');

describe('Relationship database model', done => {
  it('Creates a relationship with a type', () => {
    Relationship.create({
      title: 'sister'
    })
      .then(relationship => {
        expect(relationship.title).to.equal('sister');
        done();
      })
      .catch(e => done(e));
  });
  it('Handles relationships between users', () => {
    Relationship.create({
      userId: 1,
      relationshipId: 2,
      title: 'father'
    })
      .then(relationship => {
        expect(relationship.title.to.equal('father'));
        expect(relationship.userId.to.equal(1));
        expect(relationship.relationshipId.to.equal(2));
        done();
      })
      .catch(e => done(e));
  });
});
