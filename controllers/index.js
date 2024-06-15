//Note: requiring the different routes
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

//Note: MIDDLEWARE
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//Note: middleware catch all for routes not matched
router.use((req, res) => {
    res.status(404).end();
});

//Note: export to use throughout app
module.exports = router; 