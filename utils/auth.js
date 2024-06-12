//Define a middleware function to protect routes
//Check if user is logged in by verifying presence of user_id -> if not logged in redirect to login page -> if logged in proceed to next middleware function
const withAuth = (req, res, next) => {
    if(!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

//export the middleware function for use in other parts of application
module.exports = withAuth;