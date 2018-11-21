require('dotenv').config();
// IMPORT MONGOOSE

// DB SETUP GOES HERE
// 1. CONNECTION
// 2. HANDLE ERRORS
// 3. IMPORT MODELS

// START APP
const app = require('./app')
app.set('port', process.env.PORT || 7777 )

const server = app.listen(app.get('port'), () => {
  console.log(`👂 on PORT ${server.address().port}`);
});