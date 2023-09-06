const router = require('express').Router()
const User = require('../models/user')
const CryptoJS = require('crypto-js')

router.post('/register', async (req, res)   => {

const { username, email, password, isAdmin} = req.body 

/* if(!username || !email || !password) throw new Error('please enter your username email and password') */
const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString();
const newUser = new User({
    username: username,
    email: email,
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

    const { username, password } = req.body 
    console.log(password)
    try {
        const user = await User.findOne({username})

        if(!user){
            res.status(401).json('Wrong username')
        } 

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8);

        if(decryptedPassword !== password){
                res.status(401).json('Wrong password')
            }

        res.status(200).json(user)

    } catch(err){
        console.error(err)
    }
})

module.exports = router