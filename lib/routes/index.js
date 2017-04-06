/**
 * Created by austin on 3/3/17.
 */
const router = require('express').Router();

const apiRoutes = require('./api');
const siteRoutes = require('./site');

router.use(apiRoutes);
router.use(siteRoutes);

module.exports = router;
