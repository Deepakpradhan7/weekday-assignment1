import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCompany, setSelectedExp, setSelectedSalary, setSelectedJobRoles, setSelectedLocations } from '../../store/filterSlice';
//importing constants for filters
import { salaryOptions, locationOptions, locationLabels, jobRoleOptions, jobRoleLabels } from '../../constants/constantData';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { setFilterJobs } from '../../store/filterJobsSlice';



const FilterComponent = () => {
    const dispatch = useDispatch();
    //get tall jobs from redux
    const jobs = useSelector((state) => state.jobs.allJobs);
    const selectedExp = useSelector((state) => state.filter.selectedExp) || null
    const selectedJobRoles = useSelector((state) => state.filter.selectedJobRoles)
    const selectedSalary = useSelector((state) => state.filter.selectedSalary) || null
    const selectedLocations = useSelector((state) => state.filter.selectedLocations) || []
    const selectedCompany = useSelector((state) => state.filter.selectedCompany)


    useEffect(()=>{
        const applyAllFilter = (jobs) => {
            let filteredJobs = jobs;
    
            // Filter by experience
            if (selectedExp) {
                filteredJobs = filteredJobs.filter(
                    (job) => job.minExp && job.maxExp && selectedExp >= job.minExp && selectedExp <= job.maxExp
                );
            }
    
            // Filter by salary range
            if (selectedSalary) {
                filteredJobs = filteredJobs.filter(
                    (job) => job.maxJdSalary && selectedSalary <= job.maxJdSalary
                );
            }
            // filter by company name
            if (selectedCompany) {
                const searchTerm = selectedCompany.toLowerCase();
                filteredJobs = filteredJobs.filter(
                    (job) => job.companyName.toLowerCase().includes(searchTerm)
                );
            }
    
            // Filter by location
            if (selectedLocations.length > 0) {
                filteredJobs = filteredJobs.filter((job) =>
                    selectedLocations.some((location) =>
                        location === "remote" ? job.location === "remote" : job.location !== "remote"
                    )
                );
            }
    
            //filter by job roles
            if (selectedJobRoles.length > 0) {
                filteredJobs = filteredJobs.filter(
                    (job) => selectedJobRoles.includes(job.jobRole)
                );
            }
            return filteredJobs;
        };
        const filteredJobs = applyAllFilter(jobs); //filtering all jobs
    dispatch(setFilterJobs(filteredJobs)) // dispatching filter jobs 
    }, [jobs, selectedExp, selectedJobRoles, selectedSalary, selectedLocations, selectedCompany]) //passing dependency so that the useEffect will rerender the component whenever a state changes
    //apply filter function starts
   
    //apply filter function ends


    //All input handlers start (dispatching values)
    const handleExperienceChange = (event, value) => {
        dispatch(setSelectedExp(parseInt(value))); 
    };

    const handleSalaryChange = (event, value) => {
        dispatch(setSelectedSalary(parseFloat(value)));
    };

    const handleCompanyChange = (e) => {
        dispatch(setSelectedCompany(e.target.value));
    };

    const handleLocationChange = (event, value) => {
        dispatch(setSelectedLocations(value));
    };

    const handleJobRoleChange = (event, value) => {
        dispatch(setSelectedJobRoles(value));
    };
    //All input handlers start

    
    return (
        <div>
            <Stack style={{ marginTop: '20px', marginBottom: "20px", marginLeft: "20px" }} spacing={2} sx={{ width: 500 }}>
                <Autocomplete
                    id="tags-outlined"
                    value={selectedExp}
                    options={Array.from({ length: 11 }, (_, index) => index)}
                    getOptionLabel={(option) => option.toString()}
                    filterSelectedOptions
                    onChange={handleExperienceChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Exp"
                        />
                    )}
                />
                <Autocomplete
                    id="tags-outlined"
                    value={selectedSalary}
                    options={salaryOptions.map(option => `${option}L`)}
                    getOptionLabel={(option) => option.toString()}
                    filterSelectedOptions
                    onChange={handleSalaryChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Salary"
                        />
                    )}
                />
                <TextField value={selectedCompany}
                    onChange={handleCompanyChange} id="outlined-basic" placeholder="Company Name" variant="outlined" sx={{ width: 500 }} />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    value={selectedLocations}
                    options={locationOptions}
                    getOptionLabel={(option) => locationLabels[option]}
                    filterSelectedOptions
                    onChange={handleLocationChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Location"
                        />
                    )}
                />

                <Autocomplete
                    multiple
                    id="tags-outlined"
                    value={selectedJobRoles}
                    options={jobRoleOptions}
                    getOptionLabel={(option) => jobRoleLabels[option]}
                    filterSelectedOptions
                    onChange={handleJobRoleChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Role"
                        />
                    )}
                />
            </Stack>
        </div>
    )
}

export default FilterComponent;
