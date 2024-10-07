import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("resumeFile");
export const Upload = multer({storage}).single("file");
