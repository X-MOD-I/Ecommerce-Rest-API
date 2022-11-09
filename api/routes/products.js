const express = require('express');
const router = express.Router();
const multer = require('multer'); //multipart handler

const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //filename with file extension is a must here
    }
});

// To check which file should be accepted
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.imagetype === 'image/png') {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// };

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
    // fileFilter: fileFilter
});

const ProductsController = require('../controllers/products');

router.get('/', checkAuth, ProductsController.getAllProducts);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.createOneProduct);

router.get('/:productId', checkAuth, ProductsController.getProduct);

router.patch('/:productId', checkAuth,  ProductsController.updateProduct);

router.delete('/:productId', checkAuth, ProductsController.deleteProduct);

module.exports = router;