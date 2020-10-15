const functions = require('firebase-functions');
const config = functions.config();
console.log(config.user.email)