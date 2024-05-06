import React from 'react'
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    
    bgcolor: 'background.paper',
    borderRadius: '20px',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const JobDetailsModal = ({ jobFullDescription, open, handleModalClose }) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        About the company
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {jobFullDescription}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default JobDetailsModal
