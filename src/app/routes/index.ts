import express from "express";
import { AuthController } from "../controllers/authController";
import { productConteroller } from "../controllers/productController";
const router = express.Router();

router.post("/signup", AuthController.createUser);
router.post("/signin", AuthController.loginUser);

// product creation
router.post("/product/create", productConteroller.createProduct);
router.get("/product/get-all", productConteroller.getProducts);
router.get("/product/get/:productId", productConteroller.getSingleProduct);

export default router;
