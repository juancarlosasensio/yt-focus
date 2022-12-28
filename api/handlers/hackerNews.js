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
    const filteredArticles = articles.filter(filterEmptyURL)

    // Article keys...
//      [
//   'created_at',   'title',
//   'url',          'author',
//   'points',       'story_text',
//   'comment_text', 'num_comments',
//   'story_id',     'story_title',
//   'story_url',    'parent_id',
//   'created_at_i', '_tags',
//   'objectID',     '_highlightResult'
// ]

    const article = data.hits[0]
    const articleKeys = Object.keys(article);
    console.log('hello, data is of type', typeof data, Array.isArray(articles));
    console.log(articleKeys, article)



    res.status(200).json(filteredArticles);

  } catch (err) {
    let errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage); 
  }
}

module.exports = getArticlesByQuery;