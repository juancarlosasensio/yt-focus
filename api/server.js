// const cors = require('cors')
const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const getArticlesByQuery = require('./handlers/hackerNews')

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

app.set('port', (process.env.PORT || 8081));
app.get('/api/hackerNewsTest/:query', getArticlesByQuery)

module.exports = app
