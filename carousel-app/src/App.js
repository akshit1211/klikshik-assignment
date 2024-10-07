import React from 'react';
import { Container, Typography } from '@mui/material';
import ImageCarousel from './components/ImageCarousel';

function App() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom sx={{ marginTop: 4 }}>
        Image Carousel
      </Typography>
      <ImageCarousel />
    </Container>
  );
}

export default App;
