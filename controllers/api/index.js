const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
// const apiRouteOne = require('./apiRouteOne');
// const apiRouteTwo = require('./apiRouteTwo');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// router.use('/routeone', apiRouteOne);
// router.use('/routetwo', apiRouteTwo);

module.exports = router;