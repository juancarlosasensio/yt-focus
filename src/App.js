// import React, {useEffect} from 'react';
// import './App.css';
// //import Alert from 'react-bootstrap/Alert'
// import Alert from '@mui/material/Alert'
// import Spinner from 'react-bootstrap/Spinner'
// import { PrimaryTerm } from './PrimaryTerm'


// function reducer(state, action) {
// 	//console.log(`reducer: action.type = ${action.type}`);
//   switch (action.type) {
//       case 'stateFromBackend':
// 		let stFromBackend = Object.assign({}, action.allSkills);
// 		//console.log(`reducer case STATE_FROM_BACKEND: stFromBackend = ${JSON.stringify(stFromBackend)}`);
			
// 		return stFromBackend;	  
// 	  case 'toggleButton': 
// 		let newPrimarySkill = Object.assign({}, state.primary_skills[action.index], {showCategories: !state.primary_skills[action.index].showCategories});		
// 		let newPS = Object.assign([...state.primary_skills], {[action.index]: newPrimarySkill});
         
// 		let newState = Object.assign({}, {primary_skills: newPS, error: null} );	  
// 		return newState;
//     default:
//       throw new Error();
//   }
// }

// export function App() {
	
// 	const [errorState, setErrorState] = React.useState([]);	
// 	const initialState = {};
// 	const [allSkillsState, dispatch] = React.useReducer(reducer, initialState);
// 	useEffect(() => {    
// 		async function getAllSkills() {
// 			let allSkillsInfo;	
// 			let errorInfo;
// 			try {
// 				const uri = `/api/terms`;
// 				const response = await fetch(uri);
// 				if (response.status !== 200) {
// 					response.json()					
// 						.then(error => {
// 							const errorMessage = error.error?.message;
// 							errorInfo = `Server error: ${errorMessage}`
// 							setErrorState(errorInfo);
// 							allSkillsInfo = {};
// 							console.log(`getAllSkills: an error occurred: allSkillsInfo = ${JSON.stringify(allSkillsInfo)} errorInfo = ${errorInfo}`);
// 						})
// 						.catch((err) => {
// 							errorInfo = `Unable to retrieve data`;
// 							console.log(`getAllSkills: an error occurred. The error result is not a valid JSON object; err = ${err}`);
// 							setErrorState(errorInfo);
// 						});
// 				}			
// 				else {
// 					allSkillsInfo = await response.json();			
// 					console.log(`getAllSkills: got response.json() ; response.status = ${response.status} errorInfo = ${errorInfo}`);
// 					setErrorState(null);
// 				}
// 			}
// 			catch(err) {
// 				console.log(`getAllSkills: a network error occurred: err = ${err}`);
// 				errorInfo = `Server error: ${err}`
// 				allSkillsInfo = {};
// 				setErrorState(errorInfo);
// 			}
// 			dispatch({type: 'stateFromBackend', allSkills: allSkillsInfo});
// 		}
// 		getAllSkills();

// 	}, []);			
	
//   return (
//     <div className="App">
//         <header className="my-app">
//           <h1 className="Skills-title">App built with Express.js and React.js, running on Vercel</h1>
//         </header>
// 		 <div style={{ display: (allSkillsState?.primary_skills && allSkillsState?.primary_skills.length > 0) || errorState ? "none" : "block" }}>
// 			<Spinner animation="border" role="status">
// 			  <span className="sr-only">Loading...</span>
// 			</Spinner>	
// 		 </div>		
// 		<div className="text-center">
// 		  { 
// 			(errorState && errorState.length > 0) ? 
// 			<Alert color="error">
// 				An error occurred: { errorState }
// 			</Alert>
// 			: ''	
// 		  }			
// 		</div>		 
//         {
//           allSkillsState?.primary_skills?.map((primarySkill, ind) => { 
//             return (
// 			<PrimaryTerm key={primarySkill.primary_term} primarySkill={primarySkill} ind={ind} dispatch={dispatch} />		
// 			)
// 		  }
// 		  )
// 		}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const { status, error } = {status: 'fetched', error: false}
  const [data, setData] = useState({hits: "holy"});

  useEffect(() => {
    const fetchHackerNews = async () => {
      const res = await fetch('api/hackerNewsTest');
      const hackerNewsData = await res.json();
      setData(hackerNewsData)
    }

    fetchHackerNews();
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    const search = e.target.search.value;
    if (search) {
      setQuery(search);
      e.target.search.value = "";
    }
  };

  const articles = data?.hits;
  const displayHNArticles = status === "fetched" && Array.isArray(articles);

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
        {status === "feetched" && <div className="loading" />}
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