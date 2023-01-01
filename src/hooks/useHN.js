import { useFetch } from "./useFetch";

export const useHN = (query, options) => {
  return useFetch(`api/hn/${query}`, options);
}