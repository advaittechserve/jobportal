import React, { useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import ApplyJobDialog from './ApplyJobDialog'; // Import the form

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [dialogOpen, setDialogOpen] = useState(false);
    const jobId = '66e001111111111111fd1111';

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    // Function to close the dialog
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <div className='mx-auto bg-[--splColor] px-4 sm:px-6 lg:px-8 py-36'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-20'>
                    <span className='text-[--colorWhite]'>Latest & Top </span> Job Openings
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20'>
                    {
                        allJobs.filter(job => job.isActive) // Filter out inactive jobs
                            .length <= 0
                            ? <span className="text-center">No Job Available</span>
                            : allJobs.filter(job => job.isActive).slice(0, 6).map((job) => (
                                <LatestJobCards key={job._id} job={job} />
                            ))
                    }
                </div>
            </div>
            <div className='mx-auto bg-[--bgColor] px-4 sm:px-6 lg:px-8 py-36'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center'>
                    <span className='text-[--splColor]'>Didn't find a suitable role?</span> Submit your profile with us!
                </h1>
                <div className='flex justify-center items-center pt-8'>
                    <Button
                        onClick={handleOpenDialog}
                        className={`rounded-lg px-4 py-2 text-sm bg-[#12BBB4] text-white`}
                    >
                        Apply Now
                    </Button>
                </div>
                <ApplyJobDialog open={dialogOpen} setOpen={handleCloseDialog} jobId={jobId} />
            </div>
        </>
    );
}

export default LatestJobs;
