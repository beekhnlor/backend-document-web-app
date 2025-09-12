require('dotenv').config()
const connected = require('../connectdb/connectingdb')
const queries = require('../query/queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = process.env.SECRETKEY
const register = async(req,res)=>{
    const { user_name,password } = req.body
    try{
        const [ response ] = await connected.query (queries.CheckUser,[user_name])

        if(response.length > 0){
            return res.status(400).json({message:"User Already Exit"})
        }

        
        const hashPassword = await bcrypt.hash(password,10)

        const [ result ] = await connected.query(queries.register,[
            user_name,
            hashPassword,
            new Date(),
            new Date()
        ])

        if(result.affectedRows == 0){
            return res.status(400).json({message:"Register  Failed"})
        }

        return res.status(200).json({message:"Register Success fully"})

    }catch(err){
        console.log('create register error',err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const login = async(req,res)=>{
    const { user_name,password } = req.body
    try{

        const [ result  ] = await connected.query(queries.login,[user_name])

        if(result.length === 0){
            return res.status(400).json({message:"Login Failed"})
        }

        const user = result[0]

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Password is not Match!!!"})
        }

        const payload = {
            user_name : user.user_name
        }

        const token = jwt.sign(payload,secretkey,{expiresIn:'1d'})

        return res.status(200).json({message:"Login Success Fully",
            payload:payload,
            token:token
        })

    }catch(err){
        console.log('login Error',err)
        return res.status(500).json({message:'Internal Server Error'})
    }
}
module.exports = {
    register,
    login
}