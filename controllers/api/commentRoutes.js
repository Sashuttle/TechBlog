//Note: Import required modules
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Note: route to all comments
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentsData => res.json(dbCommentsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Note: route to create a new comment (protected route)
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

//Note: route to delete a comment by ID (protected route)
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentsData => {
        if (!dbCommentsData) {
            res.status(404).json({ message: 'There is no comment found with this id'});
            return;
        }
        res.json(dbCommentsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Note: export router to use throughout application
module.exports = router;