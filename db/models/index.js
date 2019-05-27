const User = require('./User')
const Family = require('./Family')
const Relationship = require('./Relationship')
const Poll = require('./Poll');
const Choice = require('./Choice');
const Vote = require('./Vote');

Poll.belongsTo(User, { as: 'Owner' });
User.hasMany(Poll);

Choice.belongsTo(Poll);
Poll.hasMany(Choice);

Vote.belongsTo(Choice);
Choice.hasMany(Vote);
Vote.belongsTo(User);
User.hasMany(Vote);
Vote.belongsTo(Poll);
Poll.hasMany(Vote);

Family.hasMany(User)
User.belongsTo(Family)

User.belongsToMany(User, { as: 'Relationship', through: Relationship })

module.exports = { User, Family, Relationship, Poll, Choice, Vote }
