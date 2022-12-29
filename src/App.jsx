import React, { useState, useEffect } from "react";
import { useHN } from "./hooks/useHN";
import "./App.css";

const App = () => {
  const headersList = {
    'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
    'Content-Type': 'application/json'
  }
  const [query, setQuery] = useState("elon musk");
  const { status, data, error } = useHN(query, { headers: headersList });
  // const { status } = { status: 'fetched' }

  // useEffect(() => {
  //   const headersList = {
  //     'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
  //     'Content-Type': 'application/json'
  //   }
  //   setError(false);
  //   const fetchHackerNews = async () => {
  //     try {
  //       const res = await fetch(`api/hackerNewsTest/${query}`, {
  //         headers: headersList
  //       });
  //       const hackerNewsData = await res.json();
  //       setData(hackerNewsData) 
  //     } catch (error) {
  //       console.log(error)
  //       setError(true)
  //     }
  //   }
  //   fetchHackerNews();
  // }, [query])

  const handleSubmit = e => {
    e.preventDefault();

    const search = e.target.search.value;
    if (search) {
      setQuery(search);
      e.target.search.value = "";
    }
  };

  const articles = data;
  const displayHNArticles = status === "fetched" && Array.isArray(articles) && !error;

  return (
    <div className="App">
      <header> Hackernews Search </header>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          autoComplete="off"
          name="search"
          placeholder="Search Hackernews"
        />
        <button> Search </button>
      </form>
      <main>
        {status === "idle" && (
          <div> Let's get started by searching for an article! </div>
        )}
        {status === "error" && <div>{error}</div>}
        {status === "fetched" && <div className="loading" />}
        {status === "fetching" && <div className="loading" />}
        {displayHNArticles && (
          <>
            <div className="query"> Search results for {query} </div>
            {articles.length === 0 && <div> No articles found! :( </div>}
            {articles.map(article => (
              <div className="article" key={article.objectID}>
                <a target="_blank" href={article.url} rel="noopener noreferrer">
                  {article.title}
                </a>{" "}
                by {article.author}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default App;