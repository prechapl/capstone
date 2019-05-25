const db = require('./db');
const { User } = require('./models');

const dbSync = (force = false) => {
  return db.authenticate().then(() => db.sync({ force }));
};

module.exports = { dbSync, db, User };
