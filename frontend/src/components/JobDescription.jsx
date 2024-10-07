import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import ApplyJobDialog from './ApplyJobDialog'; // Import the form

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const [dialogOpen, setDialogOpen] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);

                if (res.data && res.data.job) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.error('Failed to fetch job:', error);
            }
        };

        fetchJob();
    }, [dispatch, jobId]);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    // Function to render description with bullet points
    const renderDescriptionWithBullets = (description) => {
        if (!description) return null;
        
        // Split the description into sentences
        const sentences = description.split(/(?<=[.?!])\s+/);
        return (
            <ul className='list-disc ml-6 space-y-2'>
                {sentences.map((sentence, index) => (
                    <li key={index} className='text-gray-800 font-normal'>
                        {sentence.trim()}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <Navbar /> {/* Navbar Component */}
            <div className='bg-[--bgColor] py-36'>
                <div className='max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6'>
                        <div className='mb-4 sm:mb-0'>
                            <h1 className='font-semibold text-lg sm:text-xl'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap items-center gap-2 mt-2 sm:mt-4'>
                                <Badge className='text-[#E02424] font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                                <Badge className='text-[#E02424] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                                <Badge className='text-[#E02424] font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
                            </div>
                        </div>
                        <Button
                            onClick={handleOpenDialog}
                            className={`rounded-lg px-4 py-2 text-sm bg-[#12BBB4] text-white`}
                        >
                            Apply Now
                        </Button>
                    </div>
                    <h1 className='border-b-2 border-gray-300 font-medium py-2 sm:py-4'>Job Description</h1>
                    <div className='my-4 space-y-2'>
                        <h1 className='font-semibold text-sm sm:text-base'>Role: <span className='font-normal text-gray-800'>{singleJob?.title}</span></h1>
                        <h1 className='font-semibold text-sm sm:text-base'>Location: <span className='font-normal text-gray-800'>{singleJob?.location}</span></h1>
                        <h1 className='font-semibold text-sm sm:text-base'>Description:</h1>
                        {renderDescriptionWithBullets(singleJob?.description)}
                        <h1 className='font-semibold text-sm sm:text-base'>Experience: <span className='font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                        <h1 className='font-semibold text-sm sm:text-base'>Salary: <span className='font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                        <h1 className='font-semibold text-sm sm:text-base'>Total Applicants: <span className='font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                        <h1 className='font-semibold text-sm sm:text-base'>Posted Date: <span className='font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                    </div>
                </div>
            </div>

            <ApplyJobDialog open={dialogOpen} setOpen={handleCloseDialog} jobId={jobId}/>

            <Footer /> {/* Footer Component */}
        </>
    );
};

export default JobDescription;
