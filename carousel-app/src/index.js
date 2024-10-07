import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import the CSS file for global styling
import App from './App';
import { CssBaseline } from '@mui/material'; // CssBaseline is used to normalize styles

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
