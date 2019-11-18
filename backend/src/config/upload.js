const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname ,'..', '..', 'uploads'),
        filename: (req, file, callback) => {
            var extension = path.extname(file.originalname);
            var fileName = path.basename(file.originalname, extension);
            callback(null, `${fileName}-${Date.now()}${extension}`)
        }
    })
}