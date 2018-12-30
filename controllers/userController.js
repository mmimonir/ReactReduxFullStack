const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const registrationValidator = require('../validator/registrationValidator')
const loginValidator = require('../validator/loginValidator')

module.exports.register = async (req, res) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    const result = registrationValidator(data)
    if(!result.valid){
        return res.status(400).json({
            ...result.error
        })
    }

    const checkUser = await User.findOne({email: data.email})

    if(checkUser){
        return res.status(400).json({
            message: 'Email already used'
        })
    }
    // var salt = bcrypt.genSaltSync(10)
    // const hashed = await bcrypt.hashSync(data.password, salt)

    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password
    });

    try{
        const newUser = await user.save()
        res.status(201).json({
            message: 'User Created Successfully',
            newUser            
        })
    }catch(error){
        console.log('Error Occured '+ error)
        res.status(500).json({
            message: 'Error Occoured'
        })
    }


}

module.exports.login = async (req, res) => {
    let data = {
        email: req.body.email,
        password: req.body.password
    }

    let result = loginValidator(data)
    if(!result.valid){
        return res.ststus(400).json({
            ...result.error
        })
    }

    const user = await User.findOne({email: data.email})

    if(!user){
        return res.status(400).json({
            message: 'User not Found'
        })
    }

    // let match = await bcrypt.compareSync(data.password, user.password)
    let match = data.password == user.password

    if (!match) {
      return res.status(400).json({ message: "Password dosnot match" });
    }

    let token = jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name
    }, 'SECRET_KEY', {expiresIn: '2h'})

        res.status(200).json({
        message: 'Login Successfull',
        token: `Bearer ${token}`
    })
}