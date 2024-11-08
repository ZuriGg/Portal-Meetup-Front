import useFetch from './useFetch';

export const useMeetups = () => useFetch('http://localhost:3000/meetupentries'); //esto es un POST de un formulario, creo que este hook sólo sirve para GET

//así manejaría las peticiones GET y las POST:

// export const useMeetups = (method = 'GET', body = null) => {
//     return useFetch('http://localhost:3000/meetupentries', {
//         method, // Método HTTP (GET o POST)
//         headers: {
//             'Content-Type': 'application/json', // Asegúrate de enviar los datos en formato JSON
//         },
//         body: body ? JSON.stringify(body) : null, // Solo incluye el cuerpo si es necesario
//     });
// };

export const siguienteHook = () => useFetch('direccionHTTPS');
