// https://codesandbox.io/s/thirsty-hellman-ovkwqr?file=/src/hooks.js
import { useEffect, useRef, useReducer } from "react";

/* TODO: fix infinite loop...
  index.js:1 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at App (http://localhost:3000/static/js/main.chunk.js:174:83)
    at StyledEngineProvider (http://localhost:3000/static/js/vendors~main.chunk.js:12871:5)
 */

export const useFetch = (url, options) => {
  // Declare const cachedResponses and assign it to the result of the function call useRef with {} as an arg
  const cachedResponses = useRef({});

  // Declare const initialState and assign it a new object literal with properties status, error, and data set to str "idle", null, and object [] respectively
  const initialState = {
    status: "idle",
    error: null,
    data: []
  };

  // Use destructure to declare two consts, `state` and `dispatch`, to the result of calling useReducer with a callback function and the obj that initialState points to.
  // the callback fn receives `state` and `action` as params and goes into a switch/case expression
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });

      if (cachedResponses.current[url]) {
        console.log("This url was chached!!", url);
        const data = cachedResponses.current[url];

        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          cachedResponses.current[url] = data;
          if (cancelRequest) return;

          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;

          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    console.log(cachedResponses.current);

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url, options]);

  return state;
};
