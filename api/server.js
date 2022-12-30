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

// How to server-side render the app in "/"
// Look at express.static here:
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../public')));

//https://github.com/LionC/express-basic-auth
// app.use("/api", basicAuth( { authorizer: myAuthorizer } ))

// function myAuthorizer(username, password) {
//     const userMatches = basicAuth.safeCompare(username, process.env.SECRET_ADMIN)
//     const passwordMatches = basicAuth.safeCompare(password, process.env.SECRET_PWD)

//     return userMatches & passwordMatches
// }

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const getArticlesByQuery = require('./handlers/hackerNews')
app.get('/api/hackerNewsTest/:query', getArticlesByQuery)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.set('port', (process.env.PORT || 8081));

module.exports = app;

// https://stackoverflow.com/questions/60084428/failed-to-fetch-data-from-localhost
// https://create-react-app.dev/docs/proxying-api-requests-in-development/

// Need to figure out a way to properly configure dev host for the api so that React can call it from the client
// const allowedOrigins = ["http://localhost:3000", "http://localhost:8081"];

// app.use(
//     cors({
//         origin: function(origin, callback) {
//             if (!origin) return callback(null, true);
//             if (allowedOrigins.indexOf(origin) === -1) {
//                 var msg =
//                     "The CORS policy for this site does not " +
//                     "allow access from the specified Origin.";
//                 return callback(new Error(msg), false);
//             }
//             return callback(null, true);
//         }
//     })
// );
