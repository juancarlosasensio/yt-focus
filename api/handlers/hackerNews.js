const fetch = require('node-fetch');
const processErrorResponse = require('../utils/processErrorResponse.js')

const getArticlesByQuery = async (req, res) => {
  const { query } = req.params
  console.log("You've hit /api/hackerNewsTest with query: ", query)
  try { 
    const URL = `https://hn.algolia.com/api/v1/search?query=${query}`;
    const response = await fetch(URL, {
      host: 'hn.algolia.com',
      port: process.env.PORT || 8081,
      path: `/api/v1/search?query=${query}`,
      method : 'GET'
    });
    const data = await response.json();
    const articles = data.hits;
    const filterEmptyURL = (article) => { 
      return (article.url !== "" && article?.url?.length > 0 && article.url.includes('http') ) 
    }
    const sortByDate = (a, b) => { return new Date(b.created_at) - new Date(a.created_at) }
    const filteredArticles = articles.filter(filterEmptyURL);
    filteredArticles.sort(sortByDate)

    res.status(200).json(filteredArticles);

  } catch (err) {
    let errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage); 
  }
}

module.exports = getArticlesByQuery;