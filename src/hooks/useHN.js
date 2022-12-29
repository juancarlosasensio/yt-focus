// https://codesandbox.io/s/thirsty-hellman-ovkwqr?file=/src/hooks.js
import { useFetch } from "./useFetch";

export const useHN = (query, options) => {
  return useFetch(`api/hackerNewsTest/${query}`, options);
} 

  //   useEffect(() => {
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