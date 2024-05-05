import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, CardActions,  } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import NoContent from './noContent';
import JobDetailsModal from './jobDetailsModal';
import Loader from './loader';

const CardComponent = () => {
    const [open, setOpen] = React.useState(false); // for handling modal 
    const [showFullDesc, setShowFullDesc] = useState(false); //for showing certain character in job card 

    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);

    const filterJobs = useSelector((state)=>state.filterJobs.filterJobs) // getting filter jobs
    const loading = useSelector((state) => state.jobs.loading) //getting loading status from redux
    console.log(loading)

    let jobFullDescription; // jobDescription to pass to the modal 
    console.log(filterJobs, 'filterJobs')
    
    if (loading && filterJobs.length === 0) {
        return(
            <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", height: '90vh'}}>
                <Loader/>
            </div>
        ) 
    }
    if (filterJobs.length === 0){
        return <NoContent/>
    }
    return (
        <div style={{minHeight: '90vh'}}  >
            <Grid container spacing={5} style={{ marginTop: "5px",  }}>
                {filterJobs.map((job, index) => {
                    let description = job.jobDetailsFromCompany
                    jobFullDescription = job.jobDetailsFromCompany
                    if (!showFullDesc) {
                        description = description.substring(0, 370) + '...'
                    }
                    return (
                        <Grid item xs={12} ms={4} sm={4} key={index}>
                            <Card align='left' sx={{ maxWidth: 345 }} style={{ padding: '10px', marginBottom: '30px' , borderRadius: '20px', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)'}}>
                                <CardHeader align='left'
                                    avatar={
                                        <Avatar aria-label="logo">
                                            <CardMedia
                                                component="img"
                                                image={job?.logoUrl}
                                                alt="green iguana"
                                                style={{ borderRadius: '15px' }}
                                            />
                                        </Avatar>
                                    }
                                    style={{ fontWeight: '' }}
                                    title={job?.companyName}
                                    subheader={
                                        <div>
                                            <Typography sx={{ textTransform: 'capitalize' }} variant="body2" color="textSecondary" >
                                                {job?.jobRole}
                                            </Typography>
                                            {job?.location === "remote" ? "India" : job?.location.charAt(0).toUpperCase() + job?.location.slice(1)}

                                        </div>
                                    }
                                />
                                <Typography color="textSecondary" sx={{ fontWeight: 'light' }} style={{ marginLeft: '15px' }} >
                                    Estimated Salary: {job?.minJdSalary && `${job?.minJdSalary} -`} {job?.maxJdSalary} LPA  ✅
                                </Typography>
                                <>
                                    <CardContent align='left'>
                                        <Typography color="textSecondary" gutterBottom variant="h6" component="div">
                                            About Company:
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {description}
                                        </Typography>
                                        <Typography  align='center' style={{color: '#651fff',  cursor: 'pointer', margin: '5px' }} onClick={handleModalOpen} variant="body2" color="text.secondary">
                                            {showFullDesc ? " " : 'View Details'}
                                        </Typography>

                                    </CardContent>
                                </>
                                <Typography  color="textSecondary" sx={{ fontWeight: 'light', marginLeft: '15px' }}>
                                    {job.minExp ? `Minimum Experience ${job.minExp}` : '\u00A0'}
                                </Typography>

                                <CardActions>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Button sx={{ textTransform: "none" }} style={{ backgroundColor: '#55efc4', color: 'black' }} fullWidth variant="contained"> ⚡ Easy Apply</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button sx={{ textTransform: "none" }} style={{ backgroundColor: '#651fff' }} fullWidth variant="contained">Unlock referral asks</Button>
                                        </Grid>
                                    </Grid>

                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            {loading && <Loader />} 
            {/* passing props to jobDetailsModal */}
            <JobDetailsModal jobFullDescription={jobFullDescription} open={open} handleModalClose={handleModalClose}/>
          
        </div>
    )
}

export default CardComponent;
