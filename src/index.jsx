import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';

import Navigation from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Navigation />
    </React.StrictMode>
);
