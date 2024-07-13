// المسار: /src/config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary, uploadOptions } = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'educational-resources';
        let format;
        let resource_type = uploadOptions.resource_type;

        if (file.mimetype.startsWith('image')) {
            format = undefined; // Let Cloudinary handle the image format
        } else if (file.mimetype === 'application/pdf') {
            format = 'pdf';
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   file.mimetype === 'application/msword') {
            format = 'docx';
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
                   file.mimetype === 'application/vnd.ms-powerpoint') {
            format = 'pptx';
        }

        return {
            folder: folder,
            format: format,
            resource_type: resource_type,
            public_id: file.fieldname + '-' + Date.now(),
        };
    },
});

const upload = multer({ storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type.'));
        }
    }
    
 });

module.exports = upload;
