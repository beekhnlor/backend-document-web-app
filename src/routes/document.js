const express = require('express')
const router = express.Router()
const { create,read,readById,update,remove } = require('../controllers/document')
const { register,login } = require('../controllers/auth')

//
router.post('/document',create)
router.get('/document',read)
router.get('/document/:id', readById)
router.put('/document/:id', update)
router.delete('/document/:id', remove)
//
router.post('/register',register)
router.post('/login',login)


module.exports = router