import useFetch from './useFetch.js';

//hook para conseguir las entradas de meetups
export const meetupEntriesFetch = (formData) => {
    return useFetch('http://localhost:3000/meetupentries', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
};

//hook para conseguir los datos del usuario
export const fetchUserData = (userId) => {
    return useFetch(`http://localhost:3000/users/${userId}`);
};
