import React from 'react'
import useJobData from '../hooks/useJobData'
import { useDispatch } from 'react-redux'
import { setAllJobs, setLoading } from '../store/jobDataSlice';
import Card from './jobCard/card';

const Home = () => {
    const dispatch = useDispatch();
    const {jobData, isLoading} = useJobData() //using hooks to get data in my component
    dispatch(setAllJobs(jobData));
    dispatch(setLoading(isLoading))
    console.log(jobData, isLoading)
    return (
    <div>
      <Card/>
    </div>
  )
}

export default Home
