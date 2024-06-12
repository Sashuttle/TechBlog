//importing required modules and packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// define the comment model with its attributes and configuration
class Comment extends Model {}

//Initializing the comment model with its configurations and attributes
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    }, {

    //sequelize the configuration options
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

//export comment model to be used throughout application
module.exports = Comment;