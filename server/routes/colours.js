const { Router } = require('express')

const coloursController = require('../controllers/colours')

const router = Router()

router.get('/', coloursController.index)
router.post('/', coloursController.create)
router.delete('/:name', coloursController.destroy)

module.exports = router
