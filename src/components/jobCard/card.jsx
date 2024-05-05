import React from 'react'
import { useSelector } from 'react-redux';

const Card = () => {
    const jobDetails = useSelector((state)=>state.jobs.allJobs)
    const loading = useSelector((state)=>state.jobs.loading)

    console.log(jobDetails,loading, 'jd')
  return (
    <div>
      Card
    </div>
  )
}

export default Card;
