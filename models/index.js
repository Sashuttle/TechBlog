//Importing the models
const User = require('./user');
const Comment = require('./comments');
const Post = require('./post');

//Defining Associations
//Added on delete and hook functionality to improve code
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

Comment.belongsTo(Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

Post.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

//exporting the models
module.exports = { User, Post, Comment };