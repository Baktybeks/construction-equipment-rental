const Router = require('express')
const router = new Router()
const applicationController = require('../controllers/applicationController')

router.post('/', applicationController.create)
router.get('/', applicationController.getAll)
router.get('/:id', applicationController.getOne);
router.delete('/:id', applicationController.deleteOne)
router.put('/:id', applicationController.updateProcessed)

module.exports = router
