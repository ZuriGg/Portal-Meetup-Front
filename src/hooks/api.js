import useFetch from './useFetch.js';

const URL_BACK = import.meta.env.VITE_URL_BACK;

//hook para conseguir las entradas de meetups
export const meetupEntriesFetch = (formData) => {
    return useFetch(`${URL_BACK}/meetupentries`, {
        method: 'POST',
        body: JSON.stringify(formData),
    });
};

//hook para conseguir los datos del usuario
export const fetchUserData = (userId) => {
    return useFetch(`${URL_BACK}/users/${userId}`);
};
