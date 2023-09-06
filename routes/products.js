const router = require('express').Router()

router.get("/products", (req, res) => {
console.log('product fetched successfully');
res.send('product fetched successfully')
})

router.post('/newproduct', (req, res) => {
    const newProduct = req.body.newProduct
    console.log(newProduct)
    res.send(newProduct.concat(' is ordered'))
})

module.exports = router