const express = require('express')
const User = require('../../../Models/User/User')
const { generateToken } = require('../../../utils/handleJwtToken')

// create login controller code with create JWT token

exports.login = async (req, res)=>{

   try {
     const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid email'
        })
    }
    const isPasswordCorrect = await user.correctPassword(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid password'
        })
    }
    const token = generateToken(
        {
            id: user._id,
            user_role: user.user_role,
            email: user.email,
        },
        'User'
    );

    res.status(200).json({
        status: 'success',
        data: {
            user,
            token
        }
        
    })

   }
   catch (err) {
    res.status(400).json({
        status: 'fail',
        message: err.message
    })
   }

}