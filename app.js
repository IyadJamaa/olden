const path = require('path');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');





const app = express();

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

// Serving static files

app.use(express.static(path.join(__dirname, '/fe')));




// 1) MIDDLEWARES


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.get ('/', (req, res) => {
  res.status(200);
});



app.use('/api/v1/users', userRouter);

module.exports = app;
