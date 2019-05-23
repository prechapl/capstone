const db = require('../db');
const { Sequelize } = db;

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'User must have a first name.'
            },
            lettersOnly(firstName){
                const regexp = /^[A-Za-z]+$/;
                if(!regexp.test(firstName)){
                    throw new Error('First name must consist only of letters.')
                }
            }
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'User must have a last name.'
            },
            lettersOnly(lastName){
                const regexp = /^[A-Za-z]+$/;
                if(!regexp.test(lastName)){
                    throw new Error('Last name must consist only of letters.')
                }
            }
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                args: true,
                msg: 'Age must be an integer.'
            },
            notEmpty: {
                args: true,
                msg: 'User must have an age.'
            },
            min: {
                args: [0],
                msg: 'Age must be a positive integer.'
            },
            max: {
                args: 120,
                msg: 'User age should be less than 120 years.'
            }
        }
    },
    imgUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'User must have a profile image URL.'
            },
            isUrl: {
                args: true,
                msg: 'Please enter a valid image URL.'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: 'User must have an email address.'
            },
            isEmail: {
                args: true,
                msg: 'Please enter valid email address.'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = User;
