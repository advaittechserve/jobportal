import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus, updateNote} from "../controllers/application.controller.js";
import { singleUpload } from "../middlewares/mutler.js"; // Import the multer configuration

const router = express.Router();

// Apply for a job (POST method for creating a new application)
// Add the `upload` middleware before the `applyJob` controller to handle the file upload
router.route("/apply/:id").post(singleUpload, applyJob);

// Get all applied jobs
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Get all applicants for a specific job (admin view)
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

router.route('/applicants').get(isAuthenticated, getApplicants);

// Update application status (admin)
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

router.route("/note/:id/update").post(isAuthenticated, updateNote);


export default router;
