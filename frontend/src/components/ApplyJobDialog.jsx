import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const ApplyJobDialog = ({ open, setOpen, jobId }) => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        fullname: "",
        designation: "",
        phoneNumber: "",
        email: "",
        currentCtc: "",
        experience: "",
        lastCompanyName: "",
        linkedinProfile: "",
        portfolioLink: "",
        resumeFile: null,  // Initial value should be null for files
        positionApplyingFor: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { portfolioLink, linkedinProfile, fullname, designation, phoneNumber, email, currentCtc, experience, lastCompanyName, positionApplyingFor, resumeFile } = input;

        if (!fullname) {
            toast.error("Full Name is required");
            return false;
        }
        if (!designation) {
            toast.error("Designation is required");
            return false;
        }
        if (!phoneNumber) {
            toast.error("Phone Number is required");
            return false;
        }
        if (!email) {
            toast.error("Email is required");
            return false;
        }
        if (!currentCtc) {
            toast.error("Current CTC is required");
            return false;
        }
        if (!experience) {
            toast.error("Years of Experience is required");
            return false;
        }
        if (!lastCompanyName) {
            toast.error("Last Company Name is required");
            return false;
        }
        if (!positionApplyingFor) {
            toast.error("Position Applying For is required");
            return false;
        }
        if (!resumeFile) {
            toast.error("Resume is required");
            return false;
        }
        if (!linkedinProfile) {
            toast.error("LinkedIn Profile is required");
            return false;
        }
        if (!portfolioLink) {
            toast.error("Portfolio is required");
            return false;
        }
        return true; // All validations passed
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, resumeFile: file });
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) return; 
        setLoading(true);

        const formData = new FormData();

        // Append non-file fields to formData
        formData.append("fullname", input.fullname);
        formData.append("designation", input.designation);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("email", input.email);
        formData.append("currentCtc", input.currentCtc);
        formData.append("experience", input.experience);
        formData.append("lastCompanyName", input.lastCompanyName);
        formData.append("linkedinProfile", input.linkedinProfile);
        formData.append("portfolioLink", input.portfolioLink);
        formData.append("positionApplyingFor", input.positionApplyingFor);

        // Append file (log it to ensure it's added correctly)
        if (input.resumeFile) {
            formData.append("resumeFile", input.resumeFile, input.resumeFile.name);
        } else {
            console.log("No resumeFile selected");
        }

        formData.append("jobId", jobId);  // Append jobId

        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}> {/* Close when clicking outside */}
            <DialogContent className="max-w-[95vw] sm:max-w-[600px] mx-auto max-h-[100vh] overflow-y-auto"> {/* Adjust max-width */}
                <DialogHeader>
                    <DialogTitle>Apply for Job</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4 md:grid-cols-2'> {/* Make 2-column layout for larger screens */}
                        {/* Input fields */}
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="fullname" className="text-right md:text-left">Full Name</Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="designation" className="text-right md:text-left">Designation</Label>
                            <Input
                                id="designation"
                                name="designation"
                                type="text"
                                value={input.designation}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="phoneNumber" className="text-right md:text-left">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="email" className="text-right md:text-left">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="currentCtc" className="text-right md:text-left">Current CTC</Label>
                            <Input
                                id="currentCtc"
                                name="currentCtc"
                                type="number"
                                value={input.currentCtc}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="experience" className="text-right md:text-left">Years of Experience</Label>
                            <Input
                                id="experience"
                                name="experience"
                                type="number"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="lastCompanyName" className="text-right md:text-left">Last Company Name</Label>
                            <Input
                                id="lastCompanyName"
                                name="lastCompanyName"
                                type="text"
                                value={input.lastCompanyName}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="linkedinProfile" className="text-right md:text-left">LinkedIn Profile</Label>
                            <Input
                                id="linkedinProfile"
                                name="linkedinProfile"
                                type="url"
                                value={input.linkedinProfile}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="portfolioLink" className="text-right md:text-left">Portfolio Link</Label>
                            <Input
                                id="portfolioLink"
                                name="portfolioLink"
                                type="url"
                                value={input.portfolioLink}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="resumeFile" className="text-right md:text-left">Resume</Label>
                            <Input
                                id="resumeFile"
                                name="resumeFile"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={fileChangeHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 md:grid-cols-1'>
                            <Label htmlFor="positionApplyingFor" className="text-right md:text-left">Position Applying For</Label>
                            <Input
                                id="positionApplyingFor"
                                name="positionApplyingFor"
                                type="text"
                                value={input.positionApplyingFor}
                                onChange={changeEventHandler}
                                className="col-span-3 md:col-span-1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-[#12BBB4]">Submit</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ApplyJobDialog;
