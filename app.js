const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const routes = require('./routes/index');
const catchErr = require('./handlers/catchErr');
const helmet = require('helmet')

app.set('views', path.join(__dirname, 'views')); // this is the folder for ejs files
app.set('view engine', 'pug');

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));
// SECURE WITH HELMET
app.use(helmet())
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// locals
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.currentPath = req.path;
  next();
});
// ROUTES
app.use('/', routes);
// 404
app.use(catchErr.notFound);
// ERR HANDLERS
app.use(catchErr.mongooseErrors);
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(catchErr.developmentErrors);
}
// production error handler
app.use(catchErr.productionErrors);

module.exports = app;