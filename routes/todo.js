const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');
const User = require("../models/users");


router.post('/', async (req, res) => {
    try {
        const verify = await jwt.verify(req.body.userToken, process.env.SECRET_KEY);
        // console.log(verify)
        // console.log(req.body)
        const newTodo = await new Todo({
            userID: verify._id,
            name: req.body.name,
            discription: req.body.discription,
            date: req.body.date,
            time: req.body.time
        })

        await newTodo.save()
    } catch (err) {
        console.log(err)
    }
});

router.get('/:userid', async (req, res) => {
    try {
        const verify = await jwt.verify(req.params.userid, process.env.SECRET_KEY);
        const todos = await Todo.find({userID: verify._id})
        const user = await User.findOne({_id: verify._id})
        res.send({
            todos,
            username: user.username
        })
    } catch (err) {
        res.send({
            err,
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todos = await Todo.deleteOne({_id: req.params.id})
        res.send({
            msg: "deleted"
        })
    } catch (err) {
        res.send({
            err,
        })
    }
});


module.exports = router;