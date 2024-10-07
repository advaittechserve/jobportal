import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs = [], loading } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    if (!loading && allJobs && allJobs.length > 0) {
      // Filter jobs to only include active ones
      setFilterJobs(allJobs.filter(job => job.isActive)); // Default to all active jobs initially
    }
  }, [allJobs, loading]);

  const handleFilter = (filteredJobs) => {
    // Filter the jobs based on the filtering criteria, then include only active jobs
    const activeFilteredJobs = filteredJobs.filter(job => job.isActive);
    setFilterJobs(activeFilteredJobs);
  };

  if (loading) {
    return <p>Loading...</p>;  // Display loader while data is being fetched
  }

  return (
    <div className="relative">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Filter Card */}
        <div className="hidden lg:block lg:w-1/5 lg:pl-4 lg:pt-4 lg:pb-4 lg:pr-0">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <FilterCard jobs={allJobs} onFilter={handleFilter} />
          </div>
        </div>

        <div className="flex-1 p-4">
          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-lg shadow-lg z-50">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full h-full flex items-center justify-center"
            >
              {/* Filter Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M3 6h18M3 14h18M3 18h18"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Filter Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <FilterCard jobs={allJobs} onFilter={handleFilter} />
              </div>
            </div>
          )}

          <div className="overflow-y-auto">
            {
              filterJobs.length <= 0 ? (
                <span>No jobs found</span>  // Display message if no jobs are found
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
