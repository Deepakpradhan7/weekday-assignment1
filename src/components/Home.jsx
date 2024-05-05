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
    <Container maxWidth='lg'>
      <FilterComponent/>
      <Card/>
    </Container>
  )
}

export default Home
