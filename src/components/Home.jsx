import React from 'react'
import useJobData from '../hooks/useJobData'
import { useDispatch } from 'react-redux'
import { setAllJobs, setLoading } from '../store/jobDataSlice';
import Card from './cards';
import FilterComponent from './filterComponent';
import Container from '@mui/material/Container';

const Home = () => {
    const dispatch = useDispatch();
    const {jobData, isLoading} = useJobData() //using hooks to get data in my component
    dispatch(setAllJobs(jobData));
    dispatch(setLoading(isLoading))
    console.log(jobData, isLoading)
    return (
      <>
      {/* OPTIONAL !! i made the filter bar sticky so that it would be easier to control job search */}
      <div style={{ position: 'sticky', top: 0, zIndex: 1 , backgroundColor:'white', paddingBottom: '5px', paddingTop: '5px', display:'flex', justifyContent:'center',alignItems:' center'  }}>
      <FilterComponent />
      </div>
      <Container maxWidth='lg'>
      <Card/>
      </Container>
    </>
  )
}

export default Home
