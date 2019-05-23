const db = require('../db')
const { Sequelize } = db

const Family = db.define('family', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'You must have a family name.'
      }
    }
  }
})

module.exports = Family
