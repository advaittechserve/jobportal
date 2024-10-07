import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateJobStatus } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const updateJobStatusInDB = async (jobId, isActive) => {
        try {
            const response = await fetch(`${JOB_API_END_POINT}/jobs/${jobId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive }),
            });
            if (!response.ok) {
                throw new Error('Failed to update job status');
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating job status:", error);
            throw error; // Rethrow or handle the error accordingly
        }
    };

    const toggleJobStatus = async (jobId, currentStatus) => {
        const newStatus = !currentStatus;
        try {
            await updateJobStatusInDB(jobId, newStatus); // Update status in DB
            dispatch(updateJobStatus({ jobId, isActive: newStatus })); // Update in Redux state
        } catch (error) {
            console.error("Failed to update job status:", error);
            // Optionally handle error (show notification, etc.)
        }
    };

    return (
        <div className='margin'>
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell style={{ width: '150px' }}>
                                    {job.isActive ?
                                        <div className='flex items-center gap-2'>
                                            <span style={{ width: '45px' , color: 'green'}}>Active</span>
                                            <ToggleRight className='cursor-pointer' style={{ color: 'green' }} onClick={() => toggleJobStatus(job._id, job.isActive)} />
                                        </div> :
                                        <div className='flex items-center gap-2'>
                                            <span style={{ color: '#E02424' , width: '45px' }}>Inactive</span>
                                            <ToggleLeft className='cursor-pointer' style={{ color: '#E02424' }} onClick={() => toggleJobStatus(job._id, job.isActive)} />
                                        </div>
                                    }
                                </TableCell>

                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable;
