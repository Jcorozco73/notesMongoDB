// crear las rutas
const { Router }  = require('express')
const router = Router()

 const { renderSignUpForm, renderSigninForm, signin, signUp, logout
      } = require('../controllers/user.controllers.js');


    router.get('/users/signup', renderSignUpForm)

    router.post('/users/signup', signUp)

    router.get('/users/signin', renderSigninForm)

    router.post('/users/signin', signin)

    router.get('/users/logout',logout )
  
    
    module.exports = router


 
  


    





