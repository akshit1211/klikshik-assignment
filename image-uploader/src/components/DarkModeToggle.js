import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { Box } from '@mui/system';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 16,
                right: 16,
            }}
        >
            <FormControlLabel
                control={
                    <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
                }
                label={darkMode ? 'Dark Mode' : 'Light Mode'}
            />
        </Box>
    );
};

export default DarkModeToggle;
