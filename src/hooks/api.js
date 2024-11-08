import useFetch from './useFetch';

export const useMeetups = () => useFetch('http://localhost:3000/meetupentries');

export const ddd = () => useFetch('');
