const mongoose = require('mongoose');
require('dotenv').config();
// IMPORT MONGOOSE

// DIFFERENTIATE BETWEEN PROD AND DEV DBs
let mongooseString;
if (process.env.NODE_ENV === 'development') {
  mongooseString = process.env.MONGOLAB_AMBER_URI;
} else {
  mongooseString = process.env.MONGODB_URI;
}

mongoose.connect(mongooseString, { useNewUrlParser: true, promiseLibrary: global.Promise}).then(
  () => { console.log(`🔗 👌 🔗 👌 🔗 👌 🔗 👌 Mongoose connection open on: ${mongooseString}.`) },
  err => { console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`) }
);
// IMPORT MODELS

// START APP
const app = require('./app')
app.set('port', process.env.PORT || 7777 )

const server = app.listen(app.get('port'), () => {
  console.log(`👂 on PORT ${server.address().port}`);
});