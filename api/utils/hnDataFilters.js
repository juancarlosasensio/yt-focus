const filterEmptyURL = (article) => { 
  return article.url && article?.url?.includes('http'); 
};

const sortByDate = (a, b) => { 
  return new Date(b.created_at) - new Date(a.created_at) 
};

module.exports = {
  filterEmptyURL, 
  sortByDate
}