const router = require('express').Router()
const generateAnswer = require('../controllers/generateAnswer.controller')

router.get('/', generateAnswer.generateAnswer)
module.exports = router
