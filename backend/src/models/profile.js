'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {

        static associate(models) {
            Profile.belongsTo(models.User, { 
                foreignKey: 'userId'
            })
        }
    }
    Profile.init({
        userId: DataTypes.INTEGER,
        fullName: DataTypes.STRING,
        picture: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Profile',
    })
    return Profile
}