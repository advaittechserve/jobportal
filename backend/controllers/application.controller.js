import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const {
            fullname,
            designation,
            phoneNumber,
            email,
            currentCtc,
            experience,
            lastCompanyName,
            linkedinProfile,
            portfolioLink,
            positionApplyingFor
        } = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Validate required fields
        if (!fullname || !email || !positionApplyingFor) {
            return res.status(400).json({
                message: "Required fields are missing.",
                success: false
            });
        }

        // Handle file upload to Cloudinary
        const uploadFileToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "raw",
                        folder: "resumes"
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(fileBuffer).pipe(uploadStream);
            });
        };

        let resumeFileUrl = null;
        if (req.file) {
            const uploadResult = await uploadFileToCloudinary(req.file.buffer);
            resumeFileUrl = uploadResult.secure_url; // Cloudinary provides a secure URL for the uploaded file
        }

        // Create a new application including the new fields
        const newApplication = await Application.create({
            job: jobId,
            fullname,
            designation,
            phoneNumber,
            email,
            currentCtc,
            experience,
            lastCompanyName,
            linkedinProfile,
            portfolioLink,
            resumeFile: resumeFileUrl, // Store the Cloudinary URL
            positionApplyingFor
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error occurred:", error); // Log the error for debugging
        return res.status(500).json({
            message: "An error occurred", // Optionally include error message
            success: false
        });
    }
};


// Get all applied jobs (without user-specific filter)
export const getAppliedJobs = async (req, res) => {
    try {
        // Fetch all applications
        const applications = await Application.find().sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        let applications;

        if (jobId) {
            // If a job ID is provided, fetch applicants for that job
            applications = await Application.find({ job: jobId })
                .populate({
                    path: 'job',
                    select: 'title' // Adjust fields to fetch from the Job model if needed
                })
                .sort({ createdAt: -1 });
        } else {
            // If no job ID is provided, fetch all applicants
            applications = await Application.find()
                .populate({
                    path: 'job',
                    select: 'title' // Adjust fields to fetch from the Job model if needed
                })
                .sort({ createdAt: -1 });
        }

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: jobId ? 'No applications found for this job.' : 'No applications found.',
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.error("Error in getApplicants:", error);
        return res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
};



// Update application status (admin)
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }

        // Find the application by application ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { note } = req.body;
        const applicationId = req.params.id;

        if (!note) {
            return res.status(400).json({
                message: 'Note is required',
                success: false
            });
        }

        // Find the application by application ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // Update the note
        application.note = note;
        await application.save();

        return res.status(200).json({
            message: "Note updated successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error in updateNote:", error);
        return res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
};
