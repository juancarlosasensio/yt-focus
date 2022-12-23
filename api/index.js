// https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env' })
}
const fetch = require('node-fetch');
// const cors = require('cors')
const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json());


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

app.get('/api/testSetup', (req, res) => {
  console.log('Processing [GET] request to route /api/testSetup');
  console.log(process.env.NODE_ENV)

  if (process.env.NODE_ENV !== 'production') {
    res.send({secret: "From /api/testSetup baby"})
  } else {
    res.send({secret: "We're on prod baby!"})
  }
});

app.get('/api/hackerNewsTest/:query', async (req, res) => {
  const { query } = req.params
  console.log("You've hit /api/hackerNewsTest")
  try { 
    const BASE_URL = `https://hn.algolia.com/api/v1/search?query=${query}`;
    const response = await fetch(BASE_URL, {
      host: 'hn.algolia.com',
      port: process.env.PORT || 8081,
      path: `/api/v1/search?query=${query}`
    });
    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    let errMessage = `${err}`;
		processErrorResponse(res, 500, errMessage); 
  }
})
	
function processErrorResponse(res, statusCode, message) {
	console.log(`${statusCode} ${message}`);
	res.status(statusCode).send({
		error: {
			status: statusCode,
			message: message
		},
	});
}	

app.listen(app.get('port'), function() {
  console.log('Express app vercel-express-react-demo is running on port', app.get('port'));
});

module.exports = app
