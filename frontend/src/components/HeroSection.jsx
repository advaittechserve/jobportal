import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative text-center py-36'>
            <div className='relative z-10'>
                <div className='flex flex-col gap-8 my-12'>
                    <h1 className='text-5xl font-bold text-black mb-8'>
                        Search, Apply & <br /> Work with <span className='text-[#12BBB4]'>Advait Techserve</span>
                    </h1>
                    <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                        <input
                            type="text"
                            placeholder='Find your matching jobs'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-2 px-4'
                        />
                        <Button onClick={searchJobHandler} className="rounded-r-full bg-[#12BBB4]">
                            <Search className='h-5 w-5' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
