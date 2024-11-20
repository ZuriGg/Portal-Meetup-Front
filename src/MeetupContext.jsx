import PropTypes from 'prop-types';

import { createContext, useContext, useEffect, useState } from 'react';

//se crea el contexto
export const MeetupContext = createContext();
export const useMeetup = () => useContext(MeetupContext);

//se proveen a los hijo del contexto meetup
export const MeetupProvider = ({ children }) => {
    //estado donde se guardaran los meetups
    const [meetups, setMeetups] = useState([]);

    //se predefinen los filtros
    const [filters, setFilters] = useState({
        location: '',
        minVotes: '',
        category: '',
        search: '',
    });

    //se predefine el orden
    const [order, setOrder] = useState('createAt');

    //se inicializa en false la carga del fetch a los meetups
    const [loading, setLoading] = useState(false);

    const fetchMeetups = async () => {
        setLoading(true);
        try {
            // se crea una url para pasarle al back los filtros y el orden
            const qry = new URLSearchParams({ ...filters, order }).toString();
            const res = await fetch(`/meetups?${qry}`);
            const data = res.json();
            if (res.data === 'ok') {
                setMeetups(data.data);
            }
        } catch (error) {
            console.error('error en el fecth de filtros', error);
        } finally {
            setLoading(false);
        }
    };

    //cada vez que se carga la pagina se renderiza tanto el fetch como los filtros
    useEffect(() => {
        fetchMeetups();
    }, [filters, order]);

    //se devuleve el contexto a toda la app
    return (
        <MeetupContext.Provider
            value={(meetups, filters, setFilters, order, setOrder, loading)}
        >
            {children}
        </MeetupContext.Provider>
    );
};

MeetupProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
