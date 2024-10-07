import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    // applicant: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    fullname: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    currentCtc: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    lastCompanyName: {
        type: String,
        required: true
    },
    linkedinProfile: {
        type: String,
        required: true
    },
    portfolioLink: {
        type: String,
        required: true
    },
    resumeFile: {
        type: String, // Assuming you're storing the file path or URL
        required: true
    },
    positionApplyingFor: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false,
        default: ''
    }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);
