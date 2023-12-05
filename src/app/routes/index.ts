import express from 'express'
import { AuthController } from '../controllers/authController'
const router = express.Router()

router.post("/signup", AuthController.createUser)
router.post("/signin", AuthController.loginUser)

export default router