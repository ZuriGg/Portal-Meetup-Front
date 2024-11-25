//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { UserProvider } from './UserContext.jsx';
import { MeetupProvider } from './MeetupContext.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));

/* root.render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </StrictMode>
); */

root.render(
    <BrowserRouter>
        <UserProvider>
            <MeetupProvider>
                <App />
            </MeetupProvider>
        </UserProvider>
    </BrowserRouter>
);
