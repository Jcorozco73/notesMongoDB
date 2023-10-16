const helpers = {}
    helpers.validateAuth = (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/signin');
        req.flash('error_msg',
        'Not Authorized')
    }

module.exports = helpers

