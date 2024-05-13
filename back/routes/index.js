const Router = require('express')
const router = new Router()
const equipmentRouter = require('./equipmentRouter')
const applicationRouter = require('./applicationRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')

router.use('/equipment', equipmentRouter)
router.use('/application', applicationRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)



module.exports = router
