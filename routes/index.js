const express = require('express');
const router = express.Router();
const catchErr = require('../handlers/catchErr')
// IMPORT CONTROLLERS
const pageControl = require('../controllers/pageControl');

// router.get('*', catchErr.errorHandler(pageControl.asyncPage));

router.get('/', pageControl.home);
router.get('/async', catchErr.errorHandler(pageControl.asyncPage));

module.exports = router;