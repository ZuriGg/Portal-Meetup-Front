import PropTypes from 'prop-types';

import { createContext, useContext, useEffect, useState } from 'react';

//se crea el contexto
export const MeetupContext = createContext();
export const useMeetup = () => {
    return useContext(MeetupContext);
};

//se proveen a los hijo del contexto meetup
export const MeetupProvider = ({ children }) => {
    const [qry, setQry] = useState('');
    //se predefinen los filtros
    const [filters, setFilters] = useState({
        location: '',
        // minVotes: '',
        category: '',
        search: '',

        filtersChange: false,
    });

    //se predefine el orden
    const [order, setOrder] = useState('createAt');

    //se inicializa en false la carga del fetch a los meetups
    const [loading, setLoading] = useState(false);

    const fetchMeetups = async (filters, order) => {
        setLoading(true);
        try {
            // se crea una url para pasarle al back los filtros y el orden
            const qry = new URLSearchParams({ ...filters, order }).toString();
            console.log(`URL generada: http://localhost:3000/meetups?${qry}`);
            if (qry) {
                setQry(qry);
            }
        } catch (error) {
            console.error('error en el fecth de filtros', error);
        } finally {
            setLoading(false);
        }
    };

    //cada vez que se carga la pagina se renderiza tanto el fetch como los filtros
    useEffect(() => {
        if (filters.filtersChange) {
            fetchMeetups(filters, order);
            setFilters((prevFilters) => ({
                ...prevFilters,
                filtersChange: false,
            })); // Reinicia el estado
        }
    }, [filters, order]);

    //se devuleve el contexto a toda la app
    return (
        <MeetupContext.Provider
            value={{ qry, setQry, filters, setFilters, setOrder, loading }}
        >
            {children}
        </MeetupContext.Provider>
    );
};

MeetupProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
