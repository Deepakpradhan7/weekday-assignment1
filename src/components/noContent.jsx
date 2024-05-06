import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import {  Typography } from '@mui/material';

const NoContent = () => {
    const noContentImage = '/no-content.jpg'
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Container sx={{marginTop:'50px'}}>
            <Typography variant="h6" gutterBottom>
            No Jobs available for this category at the moment
            </Typography>
                <CardMedia
                    height="250"
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    component="img"
                    image={noContentImage}
                    alt="green iguana"   
                />
            </Container>
        </Box>
    )
}

export default NoContent
