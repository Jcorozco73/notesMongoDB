const userController = {}

const passport = require('passport')

const user = require('../models/User')

userController.renderSignUpForm = (req,res) => {
    res.render('users/signup')

}

userController.signUp = async (req, res) => {
    const errors = []
 const { name, email, password, confirm_password} = req.body
 if (password != confirm_password) {
    errors.push({
        text: 'Password do not match'
    })
    }
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        })
        }   
        if (errors.length > 0) {
            res.render('users/signup', {
                errors,
                name,
                email,
                password,
                confirm_password
            })
        } else {
            const emailUser = await user.findOne
            ({email: email})
            if (emailUser) {
                req.flash('errors_msg',
                 'The email is already in use')
                res.redirect('/users/signup')
            } else {
                const newUser = new user({name, email, password})
                newUser.password = await newUser.encryptPassword(password)
                await newUser.save()
                req.flash('success_msg',
                 'You are registered')
                res.redirect('/users/signin')
            }
                       
    }
     
}

userController.renderSigninForm = (req, res) => {
    res.render('users/signin');
}

userController.signin = 
passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/note',
    failureFlash: true
})

userController.logout = (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out now')
    res.redirect('/users/signin')

}



module.exports = userController