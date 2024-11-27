import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

// Se crea el contexto
export const MeetupContext = createContext();
export const useMeetup = () => {
    return useContext(MeetupContext);
};

export const MeetupProvider = ({ children }) => {
    const [qry, setQry] = useState('');
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        location: '',
        minVotes: '',
        category: '',
        search: '',
        order: 'createdAt',
        filtersChange: false,
    });

    const fetchMeetups = async () => {
        setLoading(true);
        try {
            const qryString = new URLSearchParams(filters).toString();
            console.log(
                `URL generada: http://localhost:3000/meetups?${qryString}`
            );

            if (qryString) {
                setQry(qryString);
            }
        } catch (error) {
            console.error('Error en el fetch de filtros:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (filters.filtersChange) {
            fetchMeetups();
            setFilters((prevFilters) => ({
                ...prevFilters,
                filtersChange: false, // Reinicia `filtersChange` después del fetch.
            }));
        }
    }, [filters]);
    // Se devuelve el contexto a toda la app
    return (
        <MeetupContext.Provider
            value={{
                qry,
                setQry,
                filters,
                setFilters,
                loading,
            }}
        >
            {children}
        </MeetupContext.Provider>
    );
};

MeetupProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
