const router = require('express').Router();
const { User, Relationship, Family } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//get all users
router.get('/users', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next)
});

//get user by id
router.get('/users/:id', (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => res.send(user))
        .catch(next)
});

//get users relationships
router.get('/users/:id/relationships', (req, res, next) => {
    Relationship.findAll({
        where: {
            [Op.or]: [{ relationshipId: req.params.id }, { userId: req.params.id }]
        }
    })
        .then(relationships => res.send(relationships))
        .catch(next)
});

//get all families
router.get('/families', (req, res, next) => {
    Family.findAll()
        .then(families => res.send(families))
        .catch(next)
});

//get family by id
router.get('/families/:id', (req, res, next) => {
    Family.findByPk(req.params.id)
        .then(family => res.send(family))
        .catch(next)
});

module.exports = router;