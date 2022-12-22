import React, {useEffect} from 'react';
import './App.css';
//import Alert from 'react-bootstrap/Alert'
import Alert from '@mui/material/Alert'
import Spinner from 'react-bootstrap/Spinner'

import { PrimaryTerm } from './PrimaryTerm'


function reducer(state, action) {
	//console.log(`reducer: action.type = ${action.type}`);
  switch (action.type) {
      case 'stateFromBackend':
		let stFromBackend = Object.assign({}, action.allSkills);
		//console.log(`reducer case STATE_FROM_BACKEND: stFromBackend = ${JSON.stringify(stFromBackend)}`);
			
		return stFromBackend;	  
	  case 'toggleButton': 
		let newPrimarySkill = Object.assign({}, state.primary_skills[action.index], {showCategories: !state.primary_skills[action.index].showCategories});		
		let newPS = Object.assign([...state.primary_skills], {[action.index]: newPrimarySkill});
         
		let newState = Object.assign({}, {primary_skills: newPS, error: null} );	  
		return newState;
    default:
      throw new Error();
  }
}

export function App() {
	
	const [errorState, setErrorState] = React.useState([]);	
	const initialState = {};
	const [allSkillsState, dispatch] = React.useReducer(reducer, initialState);
	useEffect(() => {    
		async function getAllSkills() {
			let allSkillsInfo;	
			let errorInfo;
			try {
				const uri = `/api/terms`;
				const response = await fetch(uri);
				if (response.status !== 200) {
					response.json()					
						.then(error => {
							const errorMessage = error.error?.message;
							errorInfo = `Server error: ${errorMessage}`
							setErrorState(errorInfo);
							allSkillsInfo = {};
							console.log(`getAllSkills: an error occurred: allSkillsInfo = ${JSON.stringify(allSkillsInfo)} errorInfo = ${errorInfo}`);
						})
						.catch((err) => {
							errorInfo = `Unable to retrieve data`;
							console.log(`getAllSkills: an error occurred. The error result is not a valid JSON object; err = ${err}`);
							setErrorState(errorInfo);
						});
				}			
				else {
					allSkillsInfo = await response.json();			
					console.log(`getAllSkills: got response.json() ; response.status = ${response.status} errorInfo = ${errorInfo}`);
					setErrorState(null);
				}
			}
			catch(err) {
				console.log(`getAllSkills: a network error occurred: err = ${err}`);
				errorInfo = `Server error: ${err}`
				allSkillsInfo = {};
				setErrorState(errorInfo);
			}
			dispatch({type: 'stateFromBackend', allSkills: allSkillsInfo});
		}
		getAllSkills();

	}, []);			
	
  return (
    <div className="App">
        <header className="my-app">
          <h1 className="Skills-title">App built with Express.js and React.js, running on Vercel</h1>
        </header>
		 <div style={{ display: (allSkillsState?.primary_skills && allSkillsState?.primary_skills.length > 0) || errorState ? "none" : "block" }}>
			<Spinner animation="border" role="status">
			  <span className="sr-only">Loading...</span>
			</Spinner>	
		 </div>		
		<div className="text-center">
		  { 
			(errorState && errorState.length > 0) ? 
			<Alert color="error">
				An error occurred: { errorState }
			</Alert>
			: ''	
		  }			
		</div>		 
        {
          allSkillsState?.primary_skills?.map((primarySkill, ind) => { 
            return (
			<PrimaryTerm key={primarySkill.primary_term} primarySkill={primarySkill} ind={ind} dispatch={dispatch} />		
			)
		  }
		  )
		}
    </div>
  );
}

export default App;
