const express = require('express');
const router = express.Router();
const catchErr = require('../handlers/catchErr')
// IMPORT CONTROLLERS
const pageControl = require('../controllers/pageControl');

// RENDER HTML PAGE
router.get('/', pageControl.home);
// HANDLE ERR IN ASYNC FUNCTION VIA MIDDLEWARE
router.get('/async', catchErr.errorHandler(pageControl.asyncPage));
// USE BODYPARSER FOR ACCEPTING FORMS VIA POST REQUEST
router.post('/form', pageControl.formPage);

module.exports = router;