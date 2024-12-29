import { Router } from 'express'
import { products } from '../utils/constants.mjs'

const router = Router()


router.get('/api/products', (req, res) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    res.send(products)
})

export default router