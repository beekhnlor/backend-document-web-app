// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './src/uploads')//uploads ແມ່ນຊື່ທີ່ເຮົາຕັ້ງເກັບໄວ້ໃນ folder ທີ່ເຮົາຕັ້ງໄວ້
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, 'file-' + uniqueSuffix + '-' + file.originalname)
//   }
// })

// exports.upload = multer({ storage: storage }).array('file')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = './data/uploads';

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: อนุญาตให้อัปโหลดเฉพาะไฟล์รูปภาพ (jpg, png, gif) และ PDF เท่านั้น!'));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'file-' + uniqueSuffix + extension);
  }
});

exports.upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, 
  fileFilter: fileFilter 
}).array('file', 10); 