const moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = moment();
// console.log(date.format('MMM Do, YYYY'));



//this creates a timestamp since the unix epic
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);



var createdAt = 1234;
var date = moment(createdAt);
// 10:35 am
console.log(date.format('h:mm a'));