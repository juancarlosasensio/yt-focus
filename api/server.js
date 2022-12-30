const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth')

const app = express();
// adding Helmet to enhance API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

// Have Node serve the files for our built React app
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
app.use(express.static(path.resolve(__dirname, '../public')));

// Authorize all /api requests
//https://github.com/LionC/express-basic-auth
app.use("/api", basicAuth({
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
const getArticlesByQuery = require('./handlers/hackerNews')
app.get('/api/hackerNewsTest/:query', getArticlesByQuery)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.set('port', (process.env.PORT || 8081));

module.exports = app;
