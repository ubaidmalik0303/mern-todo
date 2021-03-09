const express = require('express');
const router = express.Router();
const User = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const checkEmail = await User.findOne({ email })
    if (!checkEmail) {
        res.json({
            err: "Invalid Login Detail",
            success: false,
        })
    }

    const isMatch = await bcrypt.compare(password, checkEmail.password);

    if (isMatch) {
        const token = await jwt.sign({ _id: checkEmail._id }, process.env.SECRET_KEY)
        res.json({
            msg: 'Login Successfull',
            userToken: token,
            success: true,
        })
    } else {
        res.json({
            err: 'Invalid Login Detail',
            success: false,
        })
    }

});

module.exports = router;