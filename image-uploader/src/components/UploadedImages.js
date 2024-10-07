// import React from 'react';
// import { Grid } from '@mui/material';

// const UploadedImages = ({ images }) => {
//     return (
//         <Grid container spacing={2}>
//             {images.map((image, index) => (
//                 <Grid item key={index}>
//                     <img src={image} alt={`Uploaded ${index}`} width="100" />
//                 </Grid>
//             ))}
//         </Grid>
//     );
// };

// export default UploadedImages;

import React from 'react';
import { Grid } from '@mui/material';

const UploadedImages = ({ images }) => {
    return (
        <Grid container spacing={2}>
            {images.map((image, index) => (
                <Grid item key={index}>
                    <img src={image} alt={`Uploaded ${index}`} width="100" />
                </Grid>
            ))}
        </Grid>
    );
};

export default UploadedImages;
