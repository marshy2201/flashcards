const express = require("express");
const hbs = require('hbs');
const cookieParser = require('cookie-parser');

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('isEqual', (a, b) => a === b);

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'hbs');

const mainRoute = require('./routes');
const cardsRoute = require('./routes/cards');

app.use(mainRoute);
app.use('/cards', cardsRoute);

// route not found error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;

  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 404;
  
  res.locals.error = err;
  res.status(errorStatus);
  res.render('error');
});

app.listen(3000, () => {
  console.log("This application is running on port localhost:3000");
});