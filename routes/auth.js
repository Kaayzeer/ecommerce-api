const router = require('express').Router()
const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res)   => {

const { username, email, password} = req.body 

const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString();
const newUser = new User({
    username,
    email,
    password: encryptedPassword,
})

try{
const savedUser = await newUser.save()
res.status(201).json(savedUser);

}catch(err){
console.error(err);
res.status(500).json(err)
}
})

router.post('/login', async (req, res) => {

    const { username, password: userPassword } = req.body 

 
    try {
        const user = await User.findOne({username})


        if(!user){
            res.status(401).json('Wrong username')
        } 

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8);


        if(decryptedPassword !== userPassword){
                res.status(401).json('Wrong password')
            }
                     
            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '2d'
            })

        
        const { password, ...rest } = user._doc 

        res.status(200).json({...rest, token})

    } catch(err){
        console.error(err)
    }
})

module.exports = router