const rateLimit = require('express-rate-limit');

const strictLimit = rateLimit({
    window: 10*60*1000, //10mins
    max: 5,
    message: {message: 'Too many requests, Please try again later'} 
});

const activityLimit = rateLimit({
    window: 10*60*1000,
    max: 20,
    message: {message: 'Too many requests, Please try again later'}
});

module.exports = { strictLimit, activityLimit };