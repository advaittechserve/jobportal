import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog'; // Assuming you have dialog components
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { USER_API_END_POINT } from '@/utils/constant';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user, loading } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        password: "",
        file: ""
    });
    const dispatch = useDispatch();

    // Handle text input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file input changes
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    // Submit handler to update profile details
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        if (input.password) formData.append("password", input.password);  
        if (input.file) formData.append("file", input.file);
    
        try {
            dispatch(setLoading(true));
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success("Profile updated successfully");
                setOpen(false); // Close the dialog
            } else {
                toast.error(res.data.message || "Profile update failed");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            dispatch(setLoading(false));
        }
    };
    

    useEffect(() => {
        if (user) {
            setInput({
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: "",
                file: ""
            });
        }
    }, [user]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Full Name"
                            className="w-full mt-2"
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Email"
                            className="w-full mt-2"
                        />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Phone Number"
                            className="w-full mt-2"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="w-full mt-2"
                        />
                        <p className="text-sm text-gray-500 mt-1">Leave blank if you don't want to change the password.</p>
                    </div>
                    <div>
                        <Label>Profile Photo</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="mt-2 w-full cursor-pointer"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-[#12BBB4]">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Profile"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
