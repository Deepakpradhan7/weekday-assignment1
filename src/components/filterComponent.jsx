import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCompany, setSelectedExp, setSelectedSalary, setSelectedJobRoles, setSelectedLocations } from '../store/filterSlice';
//importing constants for filters
import { salaryOptions, locationOptions, locationLabels, jobRoleOptions, jobRoleLabels } from '../constants/constantData';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { setFilterJobs } from '../store/filterJobs';


const FilterComponent = () => {
    const dispatch = useDispatch();
    //get alljobs and data from redux
    const jobs = useSelector((state) => state.jobs.allJobs);
    const selectedExp = useSelector((state) => state.filter.selectedExp) || null
    const selectedJobRoles = useSelector((state) => state.filter.selectedJobRoles)
    const selectedSalary = useSelector((state) => state.filter.selectedSalary) || null
    const selectedLocations = useSelector((state) => state.filter.selectedLocations) || []
    const selectedCompany = useSelector((state) => state.filter.selectedCompany)


    //apply filter function starts
    useEffect(() => {
        const applyAllFilter = (jobs) => {
            let filteredJobs = jobs;

            // Filter by experience
            //logic - first checking if minimum exp and maximum exp present in the job object, if present than
            // selected exp should be greater than and equal to min experience and less than or equal to max exp 
            if (selectedExp) {
                filteredJobs = filteredJobs.filter(
                    (job) => job.minExp && job.maxExp && selectedExp >= job.minExp && selectedExp <= job.maxExp
                );
            }

            // Filter by salary range
            //logic- checking max salary present or not
            // selected salary should be less than or equal to max salary  
            if (selectedSalary) {
                filteredJobs = filteredJobs.filter(
                    (job) => job.maxJdSalary && selectedSalary <= job.maxJdSalary

                );
            }

            // filter by company name
            //logic- the search name letter should be there in company name from the job object
            if (selectedCompany) {
                const searchTerm = selectedCompany.toLowerCase();
                filteredJobs = filteredJobs.filter(
                    (job) => job.companyName.toLowerCase().includes(searchTerm)
                );
            }

            // Filter by location
            //logic - checking whether the job's location matches any of the selected locations. If "remote" is selected, 
            // it only considers jobs with a location of "remote". If other locations are selected, it considers jobs with a location other than "remote".
            if (selectedLocations.length > 0) {
                filteredJobs = filteredJobs.filter((job) =>
                    selectedLocations.some((location) =>
                        location === "remote" ? job.location === "remote" : job.location !== "remote"
                    )
                );
            }

            //filter by job roles
            //logic- checking the selected job role is there in the job object or not
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
    //apply filter function ends


    //All input handlers  (dispatching values)
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
    //All input handlers end

    return (
        <Box sx={{ width: '80%', }}>
            <Stack useFlexGap flexWrap="wrap" direction='row' style={{ marginTop: '20px', marginBottom: "15px", }} spacing={2} >
                <Autocomplete
                    size='small'
                    sx={{ flexGrow: 1 }}
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
                <Autocomplete
                    size='small'
                    sx={{ flexGrow: 1 }}
                    id="tags-outlined"
                    value={selectedExp}
                    options={Array.from({ length: 11 }, (_, index) => index)}
                    getOptionLabel={(option) => option.toString()}
                    filterSelectedOptions
                    onChange={handleExperienceChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Experience"
                        />
                    )}
                />
                <Autocomplete
                    size='small'
                    sx={{ flexGrow: 1 }}
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
                    size='small'
                    sx={{ flexGrow: 2 }}
                    id="tags-outlined"
                    value={selectedSalary}
                    options={salaryOptions.map(option => `${option}L`)}
                    getOptionLabel={(option) => option.toString()}
                    filterSelectedOptions
                    onChange={handleSalaryChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Minimum Base Pay Salary"
                        />
                    )}
                />
                <TextField size='small' value={selectedCompany} sx={{ flexGrow: 1 }}
                    onChange={handleCompanyChange} id="outlined-basic" placeholder="Company Name" variant="outlined" />
            </Stack>
        </Box>
    )
}

export default FilterComponent;
