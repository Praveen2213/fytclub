const rateLimit = require('express-rate-limit');

const strictLimit = rateLimit({
    windowMs: 10*60*1000, //10mins
    max: 400,
    message: {message: 'Too many requests, Please try again later'} 
});

const activityLimit = rateLimit({
    windowMs: 10*60*1000,
    max: 400,
    message: {message: 'Too many requests, Please try again later'}
});

module.exports = { strictLimit, activityLimit };