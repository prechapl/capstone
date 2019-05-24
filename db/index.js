const db = require('./db');
const { User } = require('./models');

const dbSync = (force = false) => {
  return db.authenticate().then(() => db.sync({ force }));
};

dbSync(true).catch(e => console.log(e.message));

module.exports = { dbSync, db, User };
