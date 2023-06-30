const router = require('express').Router();
const generateCV = require('../controllers/generateCV.controller');
const generateCoverLetter = require('../controllers/generateCoverLetter');
const generateTitle = require('../controllers/generateTitle');

router.get('/cv', generateCV.generateCV);
router.get('/coverLetter', generateCoverLetter.generateCoverLetter);
router.get('/title', generateTitle.generateTitle);
module.exports = router;
