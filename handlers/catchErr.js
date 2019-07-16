exports.errorHandler = (fn) => {
  return function(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
};

// exports.catchErrors = (fn) => {
//   return function(req, res, next) {
//     return fn(req, res, next).catch(next);
//   };
// };


// function wrapAsync(fn) {
//   return function(req, res, next) {
//     // Make sure to `.catch()` any errors and pass them along to the `next()`
//     // middleware in the chain, in this case the error handler.
//     fn(req, res, next).catch(next);
//   };
// }