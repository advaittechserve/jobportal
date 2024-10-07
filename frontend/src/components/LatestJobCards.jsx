import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-[32px] cursor-pointer h-full flex flex-col justify-between'
        >
            <div>
                {/* Company and Location */}
                <div className='mb-4'>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>

                {/* Job Title and Description */}
                <div className='mb-4'>
                    <h2 className='font-bold text-xl'>{job?.title}</h2>
                    <p className='text-sm text-gray-600 line-clamp-4'>{job?.description}</p>
                </div>
            </div>

            {/* Badges for position, job type, and salary */}
            <div className='flex flex-wrap items-center gap-3 mt-4'>
                <Badge className='text-red-500 font-bold text-xs' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-red-500 font-bold text-xs' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-red-500 font-bold text-xs' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
