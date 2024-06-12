//importing required modules and packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//const { underscoredIf } = require('sequelize/lib/utils');

//define the post model by extending sequilizes model class
class Post extends Model {}

//initialize the post model with its attributes and configuration
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1] //content must be at least 1 character long (up the count?)
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {

    //sequelize configuration options
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }
)

//exporting post model for other parts of application
module.exports = Post;