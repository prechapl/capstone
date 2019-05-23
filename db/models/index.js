const User = require('./User')
const Family = require('./Family')
const Relationship = require('./Relationship')

Family.hasMany(User)
User.belongsTo(Family)

User.belongsToMany(User, { as: 'Relationship', through: Relationship })

module.exports = { User, Family, Relationship }
