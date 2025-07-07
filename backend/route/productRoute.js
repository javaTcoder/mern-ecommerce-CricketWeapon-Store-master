const express  = require("express");
const router  = express.Router();

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getAllProductsAdmin} = require("../controller/productController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
 
 

router.route("/product").get(getAllProducts)
router.route("/admin/product/new").post(isAuthentictedUser, authorizeRoles("admin"), createProduct);
router.route("/admin/products").get(isAuthentictedUser , authorizeRoles("admin") , getAllProductsAdmin)
router.route("/admin/product/:id") 
.put(isAuthentictedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthentictedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router  