import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    // Filter jobs to only include active ones
    const activeJobs = allJobs.filter(job => job.isActive);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({activeJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        activeJobs.length <= 0 ? (
                            <span>No jobs found</span> // Display message if no jobs are found
                        ) : (
                            activeJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job} />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Browse;
