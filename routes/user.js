const router = require('express').Router()
const User = require('../models/user')
const { verifyTokenAndAdmin, verifyAuthAndToken } = require('./jwtVerification')

//Update
router.put("/:id", verifyAuthAndToken, async (req, res) => {
const { password } = req.body
const { id } = req.params

    if (password) {
        password = CryptoJS.AES.encrypt(
            password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {        
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log("updatedUser", updatedUser);
      
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Delete
router.delete('/:id', verifyAuthAndToken, async (req, res) => {
  const {id} = req.params
    try {        
      const deletedUser = await User.findByIdAndDelete(id);
      res.status(200).json(deletedUser.concat('This user was deleted'));
    } catch (err) {
      res.status(500).json(err);
    }
})

// Get
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {  
  const {id} = req.params

    try {        
      const user = await User.findById(id);

      const { password, ...rest } = user._doc 

      res.status(200).json(rest)
      
    } catch (err) {
      res.status(500).json(err);
    }
})

// Get all
router.get('/', verifyTokenAndAdmin, async (req, res) => {  

    try {        
      const users = await User.find();

      res.status(200).json(users)
      
    } catch (err) {
      res.status(500).json(err);
    }
})


module.exports = router