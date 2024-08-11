// const express = require('express');
// const path = require('path');
// const router = express.Router();
// const rateLimiter = require('../middlewares/rateLimiter');

// // Rate Limiting Middleware
// router.use(rateLimiter);

// router.get('/:file', (req, res) => {
//     const filePath = path.join(__dirname, '../data', req.params.file);
//     res.sendFile(filePath);
// });

// module.exports = router;


const express = require('express');
const path = require('path');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');

// Rate Limiting Middleware
router.use(rateLimiter);

// Serve JSON files from the data directory
router.get('/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../data', `${req.params.filename}.json`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: 'File not found' });
        }
    });
});

module.exports = router;
