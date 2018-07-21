const express = require('express')
const router = express.Router()
const controller = require('../controllers/notes')

router.get('/:id', controller.get)
router.delete('/:id', controller.delete)
router.post('/', controller.post)

module.exports = router
