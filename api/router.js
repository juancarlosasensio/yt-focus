const { Router } = require('express');
const { 
  getArticlesByQuery, 
  getFrontPageArticles 
} = require('./handlers/hackerNews');

const router = Router();

router.get('/hn', getFrontPageArticles)
router.get('/hn/:query', getArticlesByQuery)

module.exports = router;