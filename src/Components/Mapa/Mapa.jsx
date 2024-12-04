import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import './Mapa.css';

// Función para obtener las coordenadas (latitud y longitud) usando Nominatim API
const getCoordinates = async (city, street, zip) => {
    const address = `${street ? street + ', ' : ''}${city}, ${zip ? zip : ''}`;
    const encodedAddress = encodeURIComponent(address); // Codificamos la dirección para usarla en la URL

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodedAddress}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            // Si no hay resultados, intentamos solo con la ciudad
            const cityUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
                city
            )}`;
            const cityResponse = await fetch(cityUrl);
            const cityData = await cityResponse.json();

            if (cityData.length === 0) {
                return null; // Si no se encuentra la ciudad, devolvemos null
            }

            // Usamos la primera coincidencia de la ciudad
            const cityCoords = cityData[0];
            return {
                lat: parseFloat(cityCoords.lat),
                lon: parseFloat(cityCoords.lon),
            };
        } else {
            // Si encontramos una coincidencia con la calle, ciudad y código postal
            const coords = data[0];
            return {
                lat: parseFloat(coords.lat),
                lon: parseFloat(coords.lon),
            };
        }
    } catch (error) {
        console.error('Error al obtener las coordenadas:', error);
        return null; // En caso de error, devolvemos null
    }
};

const Mapa = ({ city, street, zip }) => {
    const [position, setPosition] = useState([40.712776, -74.005974]); // Coordenadas iniciales (Ejemplo: Nueva York)

    // Al montar el componente o cuando cambian city, street o zip, obtener las coordenadas
    useEffect(() => {
        const fetchCoordinates = async () => {
            const coords = await getCoordinates(city, street, zip);
            if (coords) {
                setPosition([coords.lat, coords.lon]);
            } else {
                // Si no se pueden obtener las coordenadas, se mantiene la ubicación por defecto
                setPosition([40.712776, -74.005974]); // Nueva York por defecto
            }
        };

        fetchCoordinates();
    }, [city, street, zip]); // Ejecutamos cuando cambian city, street o zip

    // Función para abrir Google Maps con la ubicación
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
        window.open(url, '_blank'); // Abre la URL en una nueva pestaña
    };

    return (
        <>
            <div
                id="locationContainer2"
                style={{ width: '100%', height: '300px' }}
            >
                <MapContainer
                    center={position} // Usamos las coordenadas obtenidas
                    zoom={12}
                    style={{ width: '100%', height: '100%' }}
                    key={position.join(',')} // Esto fuerza un "re-render" del mapa cuando position cambia
                >
                    {/* TileLayer define el fondo del mapa */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Marker coloca el marcador en el mapa */}
                    <Marker position={position}>
                        <Popup>Aquí está la ubicación de tu evento.</Popup>
                    </Marker>
                </MapContainer>
                {/* Botón para enviar la ubicación a Google Maps */}
            </div>
            <button onClick={openGoogleMaps} style={{ marginTop: '10px' }}>
                Navegar con Google Maps
            </button>
        </>
    );
};

export default Mapa;

Mapa.propTypes = {
    city: PropTypes.string,
    street: PropTypes.string,
    zip: PropTypes.string,
};
