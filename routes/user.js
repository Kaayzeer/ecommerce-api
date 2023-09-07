const router = require('express').Router()
const User = require('../models/user')
const { jwtVerification, verifyAuthAndToken } = require('./jwtVerification')


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

  module.exports = router