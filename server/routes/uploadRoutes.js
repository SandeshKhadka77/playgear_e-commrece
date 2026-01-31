const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
import uploadRoutes from './routes/uploadRoutes.js';
app.use('/api/upload', uploadRoutes);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    path: `/${req.file.path}`,
  });
});

const path = require('path');
// This makes the folder accessible via URL
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

module.exports = router;