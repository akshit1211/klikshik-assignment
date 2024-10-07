// import React, { useState } from 'react';
// import { Button, LinearProgress } from '@mui/material';
// import axios from 'axios';

// const UploadProgress = ({ files, onUploadComplete }) => {
//     const [progress, setProgress] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);
//     const [cancelToken, setCancelToken] = useState(null);

//     const handleUpload = () => {
//         const token = axios.CancelToken.source();
//         setCancelToken(token);

//         const formData = new FormData();
//         files.forEach(file => formData.append('files', file));

//         axios.post('/upload', formData, {
//             cancelToken: token.token,
//             onUploadProgress: (event) => {
//                 setProgress(Math.round((event.loaded * 100) / event.total));
//             },
//         })
//             .then(() => {
//                 onUploadComplete();
//             })
//             .catch((error) => {
//                 if (axios.isCancel(error)) {
//                     console.log('Upload canceled');
//                 }
//             });
//     };

//     const handlePauseResume = () => {
//         if (isPaused) {
//             handleUpload();
//         } else {
//             cancelToken && cancelToken.cancel();
//         }
//         setIsPaused(!isPaused);
//     };

//     return (
//         <>
//             <LinearProgress variant="determinate" value={progress} />
//             <Button onClick={handleUpload} disabled={progress > 0}>
//                 Start Upload
//             </Button>
//             <Button onClick={handlePauseResume}>
//                 {isPaused ? 'Resume' : 'Pause'}
//             </Button>
//         </>
//     );
// };

// export default UploadProgress;

// import React, { useState } from 'react';
// import { Button, LinearProgress } from '@mui/material';
// import axios from 'axios';

// const UploadProgress = ({ files, onUploadComplete }) => {
//     const [progress, setProgress] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);
//     const [cancelToken, setCancelToken] = useState(null);

//     const handleUpload = () => {
//         const token = axios.CancelToken.source();
//         setCancelToken(token);

//         const formData = new FormData();
//         files.forEach(file => formData.append('files', file));

//         axios.post('/upload', formData, {
//             cancelToken: token.token,
//             onUploadProgress: (event) => {
//                 setProgress(Math.round((event.loaded * 100) / event.total));
//             },
//         })
//             .then(() => {
//                 onUploadComplete(); // Call the function to handle completion
//             })
//             .catch((error) => {
//                 if (axios.isCancel(error)) {
//                     console.log('Upload canceled');
//                 }
//             });
//     };

//     const handlePauseResume = () => {
//         if (isPaused) {
//             handleUpload();
//         } else {
//             cancelToken && cancelToken.cancel(); // Cancel the upload
//         }
//         setIsPaused(!isPaused);
//     };

//     return (
//         <>
//             <LinearProgress variant="determinate" value={progress} />
//             <Button onClick={handleUpload} disabled={progress > 0}>
//                 Start Upload
//             </Button>
//             <Button onClick={handlePauseResume}>
//                 {isPaused ? 'Resume' : 'Pause'}
//             </Button>
//         </>
//     );
// };

// export default UploadProgress; // Ensure you're exporting the component here
import React, { useState } from 'react';
import { Button, LinearProgress, Typography } from '@mui/material';
import axios from 'axios';

const UploadProgress = ({ files, onUploadComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [cancelToken, setCancelToken] = useState(null);
    const [isComplete, setIsComplete] = useState(false); // New state to track completion

    const handleUpload = () => {
        const token = axios.CancelToken.source();
        setCancelToken(token);
        setIsComplete(false); // Reset completion state before upload
        setProgress(0); // Reset progress before starting a new upload

        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        axios.post('/upload', formData, {
            cancelToken: token.token,
            onUploadProgress: (event) => {
                setProgress(Math.round((event.loaded * 100) / event.total));
            },
        })
            .then(() => {
                setIsComplete(true); // Set completion state to true
                onUploadComplete(); // Call the function to handle completion
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Upload canceled');
                } else {
                    console.error('Upload failed:', error); // Log upload errors
                }
            });
    };

    const handlePauseResume = () => {
        if (isPaused) {
            handleUpload();
        } else {
            cancelToken && cancelToken.cancel(); // Cancel the upload
        }
        setIsPaused(!isPaused);
    };

    return (
        <>
            <LinearProgress variant="determinate" value={progress} />
            <Button onClick={handleUpload} disabled={progress > 0 || isComplete}>
                Start Upload
            </Button>
            <Button onClick={handlePauseResume} disabled={progress === 0 || isComplete}>
                {isPaused ? 'Resume' : 'Pause'}
            </Button>
            {isComplete && <Typography variant="body1" color="success.main">Upload Complete!</Typography>} {/* Completion message */}
        </>
    );
};

export default UploadProgress;
