const express = require('express');
const app = express();
const { dbSync } = require('./db');
const port = process.env.PORT || 3000;
const cors = require('cors');

//body-parsing

app.use(express.json());

// cors
app.use(cors());

//api
app.use('/api', require('./api'));

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

//start server
dbSync().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});

module.exports = { app };
