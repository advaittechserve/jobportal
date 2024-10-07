import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import UpdateProfileDialog from './UpdateprofileDialog';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '@/redux/authSlice';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    // Get user, loading, and error from Redux store
    const { user, loading, error } = useSelector((store) => store.auth);

    // Fetch the user profile when the component mounts
    useEffect(() => {
        dispatch(fetchUserProfile()); // Fetch the latest user profile from API
    }, [dispatch]);

    console.log(user.profile)

    return (
        <>
            <Navbar />
            <div className='margin'>

                <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-4'>
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                                            alt="profile"
                                        />
                                    </Avatar>
                                    <div>
                                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                                        <p>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                            </div>
                            <div className='my-5'>
                                <div className='flex items-center gap-3 my-2'>
                                    <Mail />
                                    <span>{user?.email}</span>
                                </div>
                                <div className='flex items-center gap-3 my-2'>
                                    <Contact />
                                    <span>{user?.phoneNumber}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </>
    );
};

export default Profile;
