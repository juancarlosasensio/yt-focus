const { Router } = require('express');
const { 
  getArticlesByQuery, 
  getFrontPageArticles 
} = require('./handlers/hackerNews');

const router = Router();

router.get('/hackerNewsTest', getFrontPageArticles)
router.get('/hackerNewsTest/:query', getArticlesByQuery)

module.exports = router;