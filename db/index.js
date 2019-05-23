const db = require('./db');
const { User } = require('./models');

const dbSync = force => {
    return db.authenticate()
        .then(() => db.sync())
};

dbSync().catch(e => console.log(e.message));

module.exports = { dbSync, db, User };
