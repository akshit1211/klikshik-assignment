import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';

import theme from './styles/theme'; // Custom theme for dark mode
import UploadButton from './components/UploadButton'; // Component to upload files
import FileList from './components/FileList'; // Component to show selected files
import UploadProgress from './components/UploadProgress'; // Component for upload progress
import UploadedImages from './components/UploadedImages'; // Component to display uploaded images

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // State to keep track of selected files
  const [uploadedImages, setUploadedImages] = useState([]); // State for uploaded images

  // Function to handle the completion of uploads
  const handleUploadComplete = () => {
    // Generate URLs for the uploaded files
    const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
    // Update the uploadedImages state with new image URLs
    setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
    setSelectedFiles([]); // Clear selected files after upload
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <h1>Image Uploader</h1>
        <UploadButton setSelectedFiles={setSelectedFiles} /> {/* Upload button */}
        <FileList files={selectedFiles} /> {/* List of selected files */}
        {selectedFiles.length > 0 && (
          <UploadProgress files={selectedFiles} onUploadComplete={handleUploadComplete} />
        )}
        <UploadedImages images={uploadedImages} /> {/* List of uploaded images */}
      </Container>
    </ThemeProvider>
  );
};

export default App;
