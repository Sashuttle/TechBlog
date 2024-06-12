//import required modules
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//get all users but do not include passwords
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get a single user by id but do not include passwords
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'created_id']
        },
        {
            model: Comment,
            attributes: ['id', 'content', 'created_at'],
            include: {
                model: Post,
                attributes: [
                    ['title']
                ]
            }
        }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({
                message: 'No user was found using this id'
            });
            return;
        }
        res.json(dbUserData);
    });
});

//post route for user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user was found with the email address given'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'The password that was given is incorrect'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'Welcome back! You are now logged in!'});
        });
    });
});

//post route for user logout
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).json({ message: 'You have successfully logged out!'});
        });
    } else {
        res.status(404).end();
    }
});

//route to update a users information and its protected by middleware
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'Unable to find a user with the id given'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//export router to be used throughout application
module.exports = router;