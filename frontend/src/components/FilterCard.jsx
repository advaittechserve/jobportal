import React, { useState, useEffect } from 'react';

const FilterCard = ({ jobs = [], onFilter }) => {
  const [role, setRole] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState(0); // Default salary 0 LPA
  const [experience, setExperience] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const uniqueRoles = [...new Set(jobs.map(job => job.role || ''))];
    setFilteredRoles(uniqueRoles);
  }, [jobs]);

  useEffect(() => {
    const filteredJobs = jobs.filter(job => {
      const roleLower = job.role ? job.role.toLowerCase() : '';
      const locationLower = job.location ? job.location.toLowerCase() : '';
      const titleLower = job.title ? job.title.toLowerCase() : '';
      const descriptionLower = job.description ? job.description.toLowerCase() : '';

      return (
        (role === '' || roleLower.includes(role.toLowerCase())) &&
        (location === '' || locationLower === location.toLowerCase()) &&
        (salary === 0 || job.salary <= salary) &&
        (experience === '' || job.experienceLevel <= experience && job.experienceLevel >= experience-2) &&
        (search === '' ||
          titleLower.includes(search.toLowerCase()) ||
          descriptionLower.includes(search.toLowerCase()) ||
          locationLower.includes(search.toLowerCase()))
      );
    });
    onFilter(filteredJobs);
  }, [role, location, salary, experience, search, jobs, onFilter]);

  const handleRoleChange = (e) => {
    const input = e.target.value;
    setRole(input);
    
    // Filter roles based on user input
    const matchingRoles = jobs
      .map(job => job.role)
      .filter(role => role && role.toLowerCase().includes(input.toLowerCase()))
      .filter((value, index, self) => self.indexOf(value) === index); // Unique roles
    setFilteredRoles(matchingRoles);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(Number(e.target.value));
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Role Filter */}
      <div className="relative">
        <label htmlFor="role" className="block text-sm font-semibold mb-2">Role</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={handleRoleChange}
          placeholder="Type a role"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12BBB4]"
        />
        {role && filteredRoles.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
            {filteredRoles.map((roleOption, index) => (
              <li
                key={index}
                onClick={() => setRole(roleOption)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {roleOption}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Location Filter */}
      <div>
        <label htmlFor="location" className="block text-sm font-semibold mb-2">Location</label>
        <select
          id="location"
          value={location}
          onChange={handleLocationChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12BBB4]"
        >
          <option value="">Select Location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          {/* Add more locations as needed */}
        </select>
      </div>

      {/* Salary Slider Filter */}
      <div>
        <label htmlFor="salary" className="block text-sm font-semibold mb-2">Max Salary (LPA): {salary} LPA</label>
        <input
          type="range"
          id="salary"
          min="0"
          max="50" // Assuming max salary is 50 LPA
          value={salary}
          onChange={handleSalaryChange}
          className="w-full rounded-lg appearance-none cursor-pointer"
          style={{
            height: '2px',
            backgroundColor: '#12BBB4',
          }}
        />
      </div>

      {/* Experience Filter */}
      <div>
        <label htmlFor="experience" className="block text-sm font-semibold mb-2">Years of Experience</label>
        <select
          id="experience"
          value={experience}
          onChange={handleExperienceChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12BBB4]"
        >
          <option value="">Select Experience</option>
          <option value="1">0-1 years</option>
          <option value="4">2-4 years</option>
          <option value="7">5-7 years</option>
          <option value="8">8+ years</option>
        </select>
      </div>

      {/* Search Box */}
      <div>
        <label htmlFor="search" className="block text-sm font-semibold mb-2">Search Jobs</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title, description..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12BBB4]"
        />
      </div>
    </div>
  );
};

export default FilterCard;
