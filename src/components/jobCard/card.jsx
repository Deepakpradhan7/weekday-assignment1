import React from 'react'
import { useSelector } from 'react-redux';

const Card = () => {
    const jobDetails = useSelector((state)=>state.jobs.allJobs)
    const loading = useSelector((state)=>state.jobs.loading)

    console.log(jobDetails,loading, 'jd')

    return (
        <div>
        {jobDetails.map((job) => (
        <div key={job.jdUid} className="py-6 mt-4">
          <h2>{job.companyName}</h2>
          <h2>{job.jobRole}</h2>
          <h2>{job.location === "remote" ? "India" : job.location}</h2>
          <h2>{job.minExp && `Min exp ${job.minExp}`}</h2>
          <span>
            {job.minJdSalary && `${job.minJdSalary} LPA -`} {job.maxJdSalary} LPA
          </span>
        </div>
      ))}
        </div>
    )
}

export default Card;
