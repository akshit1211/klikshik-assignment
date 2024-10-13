import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material';
import { Box } from '@mui/system';

import UploadButton from './components/UploadButton'; // Component to upload files
import FileList from './components/FileList'; // Component to show selected files
import UploadProgress from './components/UploadProgress'; // Component for upload progress
import UploadedImages from './components/UploadedImages'; // Component to display uploaded images
import DarkModeToggle from './components/DarkModeToggle'; // New DarkModeToggle component

const App = () => {
  // States for selected files and uploaded images
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // State to toggle between dark and light modes
  const [darkMode, setDarkMode] = useState(true);

  // Memoized theme object to avoid unnecessary recalculations
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
        },
      }),
    [darkMode]
  );

  // Function to toggle between light and dark modes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to handle the completion of uploads
  const handleUploadComplete = () => {
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
    setSelectedFiles([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent styling based on the theme */}
      {/* Dark Mode Toggle Switch */}
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <Container>
          <h1>Image Uploader</h1>

          <UploadButton setSelectedFiles={setSelectedFiles} /> {/* Upload button */}
          <FileList files={selectedFiles} /> {/* List of selected files */}

          {selectedFiles.length > 0 && (
            <UploadProgress files={selectedFiles} onUploadComplete={handleUploadComplete} />
          )}

          <UploadedImages images={uploadedImages} /> {/* Display uploaded images */}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
