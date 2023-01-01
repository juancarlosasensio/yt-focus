const basicAuth = require('express-basic-auth')
// Authorize all /api requests
//https://github.com/LionC/express-basic-auth
const protect = () => (
  basicAuth({
    authorizer: myAuthorizer,
    unauthorizedResponse: getUnauthorizedResponse 
}))


function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.SECRET_ADMIN)
    const passwordMatches = basicAuth.safeCompare(password, process.env.SECRET_PWD)

    return userMatches & passwordMatches
}

module.exports = {
  protect
}