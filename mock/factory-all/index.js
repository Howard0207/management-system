// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();

const overview = require('./overview');

const powerFactor = require('./power-factor');

router.use('/overview', overview);

router.use('/power-factor', powerFactor);

module.exports = router;
