import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from '../ui/dialog';
import '../ui/ApplicantsTable.css';
import { Button } from '../ui/button';
// Import the CSS file for custom styles

const shortlistingStatus = ["accepted", "rejected", "pending"];

const AllApplicantsPage = () => {
    const [applicants, setApplicants] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchText, setSearchText] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [note, setNote] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);


    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${APPLICATION_API_END_POINT}/applicants`);
                if (res.data.success) {
                    setApplicants(res.data.applications || []); // Ensure we set an array
                } else {
                    toast.error(res.data.message || 'Failed to fetch applicants');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        };
        fetchApplicants();
    }, []);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                setApplicants(prevApplicants =>
                    prevApplicants.map(applicant =>
                        applicant._id === id ? { ...applicant, status } : applicant
                    )
                );
            } else {
                toast.error(res.data.message || 'Failed to update status');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };
    const noteHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/note/${id}/update`, { note });
            if (res.data.success) {
                toast.success(res.data.message);
                // Update local state immediately
                setApplicants((prevApplicants) =>
                    prevApplicants.map((applicant) =>
                        applicant._id === id ? { ...applicant, note } : applicant
                    )
                );
                setEditingNoteId(null); // Close the note modal
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };
    

    const openNoteModal = (id) => {
        const applicant = applicants.find(applicant => applicant._id === id);
        if (applicant) {
            setNote(applicant.note || ''); // Pre-fill with existing note or empty string
        }
        setEditingNoteId(id); // Set the id for the editing note
    };


    const filteredApplications = useMemo(() => {
        return applicants
            ? applicants.filter((item) => {
                const matchesStatus = statusFilter ? item.status === statusFilter : true;
                const matchesExperience = experienceFilter
                    ? item.experience === parseInt(experienceFilter)
                    : true;
                
                // Date range filter logic
                const createdAt = new Date(item.createdAt).toLocaleDateString();
                const matchesDateRange =
                    startDateFilter && endDateFilter
                        ? new Date(createdAt) >= new Date(startDateFilter) && new Date(createdAt) <= new Date(endDateFilter)
                        : true;

                const matchesSearch = searchText
                    ? item.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.phoneNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.lastCompanyName.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.positionApplyingFor.toLowerCase().includes(searchText.toLowerCase())
                    : true;

                return matchesStatus && matchesExperience && matchesDateRange && matchesSearch;
            })
            : [];
    }, [statusFilter, experienceFilter, startDateFilter, endDateFilter, searchText, applicants]);

    const columns = useMemo(
        () => [
            { name: 'Full Name', selector: (row) => row.fullname || 'NA', sortable: true },
            {
                name: 'Email',
                selector: (row) =>
                    row.email ? (
                        <a href={`mailto:${row.email}`} className="link-blue">
                            {row.email}
                        </a>
                    ) : (
                        'NA'
                    ),
                sortable: true,
            },
            {
                name: 'Contact',
                selector: (row) =>
                    row.phoneNumber ? (
                        <a
                            href={`https://wa.me/${row.phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-blue"
                        >
                            {row.phoneNumber}
                        </a>
                    ) : (
                        'NA'
                    ),
                sortable: true,
            },
            { name: 'Designation', selector: (row) => row.designation || 'NA', sortable: true },
            { name: 'Current CTC', selector: (row) => row.currentCtc || 'NA', sortable: true },
            { name: 'Experience (Years)', selector: (row) => row.experience || 'NA', sortable: true },
            { name: 'Last Company Name', selector: (row) => row.lastCompanyName || 'NA', sortable: true },
            {
                name: 'LinkedIn Profile',
                selector: (row) =>
                    row.linkedinProfile ? (
                        <a
                            href={row.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-blue"
                        >
                            LinkedIn
                        </a>
                    ) : (
                        'NA'
                    ),
                sortable: true,
            },
            {
                name: 'Portfolio Link',
                selector: (row) =>
                    row.portfolioLink ? (
                        <a
                            href={row.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-blue"
                        >
                            Portfolio
                        </a>
                    ) : (
                        'NA'
                    ),
                sortable: true,
            },
            {
                name: 'Resume',
                selector: (row) =>
                    row.resumeFile ? (
                        <a
                            href={row.resumeFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-blue"
                        >
                            Resume
                        </a>
                    ) : (
                        'NA'
                    ),
                sortable: true,
            },
            { name: 'Position Applying For', selector: (row) => row.positionApplyingFor || 'NA', sortable: true },
            { name: 'Date', selector: (row) => new Date(row.createdAt).toLocaleDateString() || 'NA', sortable: true },
            { name: 'Status', selector: (row) => <span className={`status-${row.status}`}>{row.status || 'NA'}</span>, sortable: true },
            {
                name: 'Notes',
                selector: (row) => (
                    <Popover>
                        <PopoverTrigger>
                            <span className="note-text">{row.note || 'No notes'}</span>
                        </PopoverTrigger>
                        <PopoverContent>
                            <p>{row.note || 'No notes'}</p>
                        </PopoverContent>
                    </Popover>
                ),
            },
            {
                name: 'Action',
                cell: (row) => (
                    <div className="float-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal />
                            </PopoverTrigger>
                            <PopoverContent className="w-30">
                                {shortlistingStatus.map((status, index) => (
                                    <div
                                        onClick={() => statusHandler(status, row._id)}
                                        key={index}
                                        className="flex p-2 cursor-pointer hover:bg-gray-200 rounded"
                                    >
                                        <span>{status}</span>
                                    </div>
                                ))}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div
                                            onClick={() => openNoteModal(row._id)}
                                            className="flex p-2 cursor-pointer hover:bg-gray-200 rounded"
                                        >
                                            <span>Add Note</span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add a Note</DialogTitle>
                                        </DialogHeader>
                                        <textarea
                                            className="note-input w-full p-2 rounded"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Write your note here..."
                                            rows="5"
                                        />
                                        <DialogFooter>
                                            <Button
                                                className="btn-save bg-[#12BBB4]"
                                                onClick={() => noteHandler(editingNoteId)}
                                            >
                                                Save
                                            </Button>
                                            <DialogClose asChild>
                                                <Button className="btn-cancel">Cancel</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </PopoverContent>
                        </Popover>
                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ],
        [note, statusHandler, editingNoteId, shortlistingStatus]
    );


    return (
        <div className='margin'>
        {/* Filters UI */}
        <div className="mb-4 flex flex-wrap gap-4">
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="filter-input"
            />
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
            >
                <option value="">All Status</option>
                {shortlistingStatus.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                placeholder="Experience (Years)"
                className="filter-input"
            />
            {/* Start Date Input */}
            <input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                placeholder="Start Date"
                className="filter-input"
            />
            {/* End Date Input */}
            <input
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                placeholder="End Date"
                className="filter-input"
            />
        </div>

        <DataTable
            columns={columns}
            data={filteredApplications}
            pagination
            customStyles={{
                headCells: {
                    style: {
                        fontSize: '15px',
                    },
                },
                cells: {
                    style: {
                        fontSize: '14px',
                        padding: '20px',
                    },
                },
            }}
            conditionalRowStyles={[
                {
                    when: (row) => row.status === 'accepted',
                    style: {
                        backgroundColor: '#d1fae5', // Green background for accepted
                    },
                },
                {
                    when: (row) => row.status === 'rejected',
                    style: {
                        backgroundColor: '#fee2e2', // Red background for rejected
                    },
                },
            ]}
        />
    </div>
    );
};

export default AllApplicantsPage;
