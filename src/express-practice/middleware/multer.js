import multer from "multer";

const storage  = multer.memoryStorage();

const upload = multer({
     storage: storage,
     limits: {
        fileSize: 1024 * 1024 * 5,
     },
     fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"), false);
        }
     }
});

export default upload;