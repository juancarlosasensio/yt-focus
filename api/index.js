// https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env' })
}
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

app.get('/api/hackerNewsTest', (req, res) => {
  try { 
    const BASE_URL = `https://hn.algolia.com/api/v1/search?query=${query}`;
    console.log(BASE_URL);

    res.send({ secret: 'tobi' });

  } catch (error) {
    let errMessage = `${err}`;
		processErrorResponse(res, 500, errMessage); 
  }
}

// app.get('/api/skills', (req, res) => {
// 	try {			
// 		const transformedSkills = skillsData.allSkills.map(primarySkill => {												
// 			primarySkill.totalCount = primarySkill.associated_terms.length;
// 			let associated_terms_sorted = primarySkill.associated_terms.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));
// 			if (associated_terms_sorted.length > 10) {
// 				const indLessThan02 = associated_terms_sorted.findIndex(x => parseFloat(x.ratio) <= 0.2);
// 				const cutOffIndex = indLessThan02 > 10 ? indLessThan02 : 10;
// 				associated_terms_sorted.splice(cutOffIndex);
// 			}
				
// 			primarySkill.associated_terms = associated_terms_sorted;
// 			primarySkill.showSecondary = false;
// 			return primarySkill;
// 		});
// 		//console.log("About to send all the skills");
// 		res.send({primary_skills: transformedSkills});				
// 	}
// 	catch(err) {
// 		var errMessage = `${err}`;
// 		processErrorResponse(res, 500, errMessage);
// 	}			
// })
	
	
// app.get('/api/primarySkill/:skillName', (req, res) => {
// 	const { skillName } = req.params		
// 	try {
// 		const primarySkill = skillsData.allSkills.find(x => x.primary_term.toLowerCase() === skillName.toLowerCase());
// 		if (!primarySkill) {
// 			throw `Primary skill ${skillName} was not found`;
// 		}
// 		let associated_terms_sorted = primarySkill.associated_terms.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));					
// 		primarySkill.associated_terms = associated_terms_sorted;			
// 		res.send(primarySkill);
// 	}
// 	catch(err) {
// 		var errMessage = `${err}`;
// 		processErrorResponse(res, 500, errMessage);
// 	}
// })
	
// app.get('/api/terms', (req, res) => {
// 	try {			
// 		let transformedSkills = [];
// 		Object.keys(termsData.allTerms).forEach(primarySkill => {		
// 		//console.log(`/api/terms: primarySkill = ${primarySkill} termsData.allTerms[primarySkill] = ${JSON.stringify(termsData.allTerms[primarySkill])}`);
// 			primarySkill.totalCount = termsData.allTerms[primarySkill].categories.length;
// 			let categories_sorted = termsData.allTerms[primarySkill].categories.sort((a, b) => parseInt(b.filesAndPhrases.length) - parseInt(a.filesAndPhrases.length));				
// 			termsData.allTerms[primarySkill].categories = categories_sorted;
// 			termsData.allTerms[primarySkill].showSecondary = false;
// 			transformedSkills.push({primary_term: primarySkill, categories: termsData.allTerms[primarySkill].categories});
// 		});
// 		res.send({primary_skills: transformedSkills});				
// 	}
// 	catch(err) {
// 		var errMessage = `${err}`;
// 		processErrorResponse(res, 500, errMessage);
// 	}			
// })		
	
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
