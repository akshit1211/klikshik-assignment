import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const UploadButton = ({ setSelectedFiles }) => {
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter((file) =>
            file.type.startsWith('image/')
        );

        if (validFiles.length !== files.length) {
            alert("Only image files are allowed");
        }

        setSelectedFiles(validFiles);
    };

    return (
        <Button
            variant="contained"
            component="label"
        >
            Upload Images
            <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileChange}
            />
        </Button>
    );
};

export default UploadButton;
