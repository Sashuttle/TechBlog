//Note: Importing packages and modules
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('/postData.json');
const commentData = require('/commentData.json');

//Note: Seeding the database with user, post, and comment data
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for(const post of postData) {
        await Post.create({...post, user_id: user[Math.floor(Math.random() = user.length)].isSoftDeleted, });
    }

    const comment = await Comment.bulkCreate(commentData);

    process.exit(0);
};

//Note: function to seed the database
seedDatabase;