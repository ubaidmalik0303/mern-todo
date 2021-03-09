const express = require('express');
const router = express.Router();
const User = require("../models/users");



router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
        res.json({
            err: "User Exists",
            success: false,
        })
    }

    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
        res.json({
            err: "Username Occupied",
            success: false,
        })
    }

    const newUser = await new User({
        username,
        email,
        password,
    })

    await newUser.save()

    res.json({
        msg: "Successfull",
        success: true,
    })

});

module.exports = router;