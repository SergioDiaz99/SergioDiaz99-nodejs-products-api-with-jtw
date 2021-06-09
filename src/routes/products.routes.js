import Router from 'express'
import * as productController from '../controller/product.controller' // es necesario * ya que sino el IDE no nos muestra los metodos de la clase
import {authJwt} from '../middlewares'

const router = Router();


/*router.get('/home', (req,res) => {
    res.json({
        message: 'Welcome to my application'
    });
});*/

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productController.saveProduct);

router.get('/', productController.findAllProducts);

router.get('/:productId', productController.findProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProductById);

router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productController.updateProductById);


export default router;