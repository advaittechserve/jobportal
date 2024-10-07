import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { updateJobStatus, updateJob, getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/jobs/:id").put(isAuthenticated, updateJob);
router.patch('/jobs/:id/status', updateJobStatus);

export default router;

