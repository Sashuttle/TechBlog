//Note: importing routes and required packages
const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

//Note: MIDDLEWARE
router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', postRoutes);

//Note: Export router to use throughout application
module.exports = router;