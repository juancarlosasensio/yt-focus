import fetch from "isomorphic-fetch";

export function fetchPopularRepos(language = "all") {
  // why did removing encodedURI fix the following error:
  // TypeError: only absolute urls are supported
  const URL = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;

  return fetch(URL)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error);
      return null;
    });
}