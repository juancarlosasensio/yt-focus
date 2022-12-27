const fetch = require('node-fetch');
const processErrorResponse = require('../utils/processErrorResponse.js')

const getArticlesByQuery = async (req, res) => {
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
};

module.exports = getArticlesByQuery;