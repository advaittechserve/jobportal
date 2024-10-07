import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Check token only if user is logged in
        if (user) {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            if (!token) {
                logoutHandler(); // Trigger logout if token is missing
            }
        }
    }, [user]);

    return (
        <div className='bg-white relative border-b-2 border-grey p-2'>
            <div className='flex items-center justify-between mx-auto max-w-7xl px-4'>
                <div>
                    <a href='/'><img src="/logo.png" alt="Logo" style={{ width: "90px" }} /></a>
                </div>

                {/* Hamburger Menu */}
                <div className='md:hidden'>
                    <Button onClick={toggleMenu} className='p-2' variant="outline">
                        <Menu className='h-6 w-6' />
                    </Button>
                </div>

                {/* Navbar Links for Desktop */}
                <div className={`hidden md:flex items-center gap-12 ${isMenuOpen ? 'block' : ''}`}>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='p-2 hover:bg-gray-200 rounded'><Link to="/admin/all-applicants">All Applicants</Link></li>
                                <li className='p-2 hover:bg-gray-200 rounded'><Link to="/admin/companies">Companies</Link></li>
                                <li className='p-2 hover:bg-gray-200 rounded'><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li className='p-2 hover:bg-gray-200 rounded'><Link to="/">Home</Link></li>
                                <li className='p-2 hover:bg-gray-200 rounded'><Link to="/jobs">Jobs</Link></li>
                                <li className='p-2 hover:bg-gray-200 rounded' ><Link target="_blank" to="https://advaittechserve.in/about-us">Know about Advait!</Link></li>

                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-2'>

                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className=''>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {user && user.role === 'recruiter' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        )}
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-white shadow-lg z-50`}>
                    <ul className='flex flex-col items-center font-medium py-4'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='p-2 hover:bg-gray-200 rounded'>
                                    <Link to="/admin/all-applicants">All Applicants</Link>
                                </li>

                                <li className='p-2 text-center hover:bg-gray-200'>
                                    <Link to="/admin/companies" onClick={toggleMenu}>Companies</Link>
                                </li>
                                <li className='p-2 text-center hover:bg-gray-200'>
                                    <Link to="/admin/jobs" onClick={toggleMenu}>Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='py-2 px-4 w-full text-center hover:bg-gray-200'>
                                    <Link to="/" onClick={toggleMenu}>Home</Link>
                                </li>
                                <li className='py-2 px-4 w-full text-center hover:bg-gray-200'>
                                    <Link to="/jobs" onClick={toggleMenu}>Jobs</Link>
                                </li>
                            </>
                        )}
                        {!user ? (
                            <div className='flex flex-col items-center gap-2'>

                            </div>
                        ) : (
                            <div className='flex flex-col items-center gap-2'>
                                <Link to="/profile" onClick={toggleMenu}>
                                    <div className='flex items-center gap-2'>
                                        <Button variant="link">View Profile</Button>
                                    </div>
                                </Link>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
