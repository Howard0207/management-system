// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();

const overview = require('./overview');

router.use('/overview', overview);

module.exports = router;
