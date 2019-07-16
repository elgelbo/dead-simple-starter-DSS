const mongoose = require('mongoose')

exports.errorHandler = (fn) => {
  return function (req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      res.render('404', errorDetails);
    }, // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
  });
};


exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      res.render('error', errorDetails);
    }, // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
  });
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
};

// https://mongoosejs.com/docs/api.html#error_Error
exports.mongooseErrors = (err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    return res.status(503).json({
      type: 'Database Error',
      message: err.message
    });
  }
  next(err);
};