const { Router } = require('express');
const getArticlesByQuery = require('./handlers/hackerNews')

const router = Router();

router.get('/hackerNewsTest/:query', getArticlesByQuery)

module.exports = router;