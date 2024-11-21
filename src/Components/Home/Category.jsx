// Componente que muestra una categoría de meetup (Para filtrar desde el home)
import './Category.css';

import { useEffect } from 'react';
import { useMeetup } from '../../MeetupContext.jsx';

const Category = () => {
    const { filters, setFilters, loading, setQry } = useMeetup();
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters, // Conservamos los filtros anteriores
            [name]: value, // Actualizamos el filtro específico con el nuevo valor
        }));
    };

    useEffect(() => {
        if (!loading) {
            setQry(
                new URLSearchParams({
                    ...filters,
                }).toString()
            );
            console.log('Filtros:', filters);
        }
    }, [filters, setQry, loading]);
    return (
        <div className="buttoms-categories">
            <button
                name="category"
                value=""
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '' ? 'lightblue' : 'white',
                    color: filters.category === '' ? 'white' : 'black',
                }}
            >
                Todas
            </button>
            <button
                name="category"
                value="1"
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '1' ? 'lightblue' : 'white',
                    color: filters.category === '1' ? 'white' : 'black',
                }}
            >
                Viajes y aire libre
            </button>
            <button
                name="category"
                value="2"
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '2' ? 'lightblue' : 'white',
                    color: filters.category === '2' ? 'white' : 'black',
                }}
            >
                Tecnología
            </button>
            <button
                name="category"
                value="3"
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '3' ? 'lightblue' : 'white',
                    color: filters.category === '3' ? 'white' : 'black',
                }}
            >
                Salud y bienestar
            </button>
            <button
                name="category"
                value="4"
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '4' ? 'lightblue' : 'white',
                    color: filters.category === '4' ? 'white' : 'black',
                }}
            >
                Juegos
            </button>
            <button
                name="category"
                value="5"
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '5' ? 'lightblue' : 'white',
                    color: filters.category === '4' ? 'white' : 'black',
                }}
            >
                Deportes y fitness
            </button>
            <button
                name="category"
                value="6"
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '6' ? 'lightblue' : 'white',
                    color: filters.category === '6' ? 'white' : 'black',
                }}
            >
                Arte y cultura
            </button>
            <button
                name="category"
                value="7"
                onClick={handleFilterChange}
                style={{
                    backgroundColor:
                        filters.category === '7' ? 'lightblue' : 'white',
                    color: filters.category === '7' ? 'white' : 'black',
                }}
            >
                Aficiones y pasiones
            </button>
        </div>
    );
};

export default Category;
