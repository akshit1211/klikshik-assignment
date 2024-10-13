import React from 'react';
import { Box } from '@mui/material';

const UploadedImages = ({ images }) => {
    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
            gap={16}
        >
            {images.map((image, index) => (
                <Box key={index} component="img" src={image} alt={`Uploaded ${index}`} width="100" />
            ))}
        </Box>
    );
};
