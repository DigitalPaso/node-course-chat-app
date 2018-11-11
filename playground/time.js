const moment = require('moment');

// always miliseconds

var date = moment(createdAt);

console.log (date.format('h:mm a MMM Do, YYYY'));


