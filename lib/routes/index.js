/**
 * Created by austin on 3/3/17.
 */
const router = require('express').Router();
const cors = require('cors');

const apiRoutes = require('./api');
const siteRoutes = require('./site');

router.use('/api/', apiRoutes);
router.use('/', siteRoutes);

module.exports = router;
