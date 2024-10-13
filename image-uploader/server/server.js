const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create express app
const app = express();

// Set storage engine using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '/uploads');
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir); // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        // Save file with its original name
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Set up multer middleware for handling file uploads
const upload = multer({ storage });

// Allow Cross-Origin Resource Sharing (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve uploaded files statically (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST route to handle file uploads
app.post('/upload', upload.array('files'), (req, res) => {
    if (req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    // Send back the file information for the uploaded files
    const fileInfos = req.files.map(file => ({
        originalName: file.originalname,
        path: `/uploads/${file.filename}`
    }));

    res.status(200).json({
        message: 'Files uploaded successfully',
        files: fileInfos
    });
});

// Start the server on port 5000
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
