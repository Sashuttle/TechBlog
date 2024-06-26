//Note: Import required modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Note: route to get all posts for the homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })

    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get ({
            plain: true
        }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//Note:route to get post by a single id
router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        includes: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })

    .then(dbPostData =>{
        if(!dbPostData) {
            res.status(404).json({
                message: 'There are no posts with this id!'
            });
            return;
        }

        const post = dbPostData.get({
            plain: true
        });

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Note: route to render signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

//Note: route to render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//Need this code?
/* router.get('*', (req, res) => {
    res.status(404).send('Unable to go to that webpage location');
    //Do redirect to '/' ?
}) */

    //export to use throughout application
module.exports = router;