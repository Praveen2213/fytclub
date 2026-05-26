const { body } = require('express-validator');

const validateRegister = [
    body('username').notEmpty().isLength({min: 3, max: 50}).withMessage('Username must be 3-50 characters'),
    body('email').notEmpty().isEmail().withMessage('Valid email required'),
    body('password').notEmpty().isLength({min: 6}).matches(/\d/).withMessage('Must contain a number between 0-9').matches(/[^a-zA-Z0-9]/).withMessage('Must contain at least one special character')
];

const validateLogin = [
    body('email').notEmpty().isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
];

const validateActivity = [
  body('type').notEmpty().isLength({max: 50}).withMessage('Activity type required'),
  body('value').notEmpty().isNumeric().isFloat({min: 0, max: 100000}).withMessage('Value must be a positive number'),
  body('unit').notEmpty().isLength({max: 20}).withMessage('Unit required')
];

const validateBattle = [
    body('opponent_id').isInt().withMessage('Valid opponent ID required'),
    body('activity_types').notEmpty().isArray().withMessage('Activity types required'),
    body('activity_types.*').isString().withMessage('Each activity must be a string'),
    body('challenger_dare').optional()
];

const validateAccept = [
    body('opponent_dare').optional()
];

const validateEdit = [
    body('username').optional().isLength({min: 3, max: 50}).withMessage('Username must be 3-50 characters'),
    body('email').optional().isEmail().withMessage('Valid email required'),
    body('bio').optional().isLength({max: 200}).withMessage('Bio must be under 200 characters')
];

const validatePasswordChange = [
    body('oldPassword').notEmpty().withMessage('Old password required'),
    body('newPassword').notEmpty().isLength({min: 6}).matches(/\d/).withMessage('Must contain a number').matches(/[^a-zA-Z0-9]/).withMessage('Must contain special character'),
];

module.exports = { validateRegister, validateLogin, validateActivity, validateBattle, validateAccept, validateEdit, validatePasswordChange};