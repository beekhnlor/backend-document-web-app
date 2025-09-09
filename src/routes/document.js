const express = require('express')
const router = express.Router()
const { create,read,readById,update,remove } = require('../controllers/document')

router.post('/document',create)
router.get('/document',read)
router.get('/document/:id', readById)
router.put('/document/:id', update)
router.delete('/document/:id', remove)



module.exports = router