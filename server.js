const express = require('express');
const app = express();
const { dbSync } = require('./db');
const port = process.env.PORT || 3000;

//body-parsing

app.use(express.json());

//api
app.use('/api', require('./api'));

//error handling

//start server
dbSync()
    .then(() => {
        app.listen(port, () => console.log(`listening on port ${port}`));
    });
