import Router from 'express'
import * as userController from '../controller/user.controller' // es necesario * ya que sino el IDE no nos muestra los metodos de la clase
import {authJwt, verifySignup} from '../middlewares'

const router = Router();

router.post('/',[authJwt.verifyToken, authJwt.isModerator,verifySignup.checkIfExistsUsernameOrEmail,verifySignup.checkRolesExist],userController.createUser);

router.get('/',[authJwt.verifyToken, authJwt.isModerator],userController.findAllUsers);

router.get('/:userId',[authJwt.verifyToken, authJwt.isModerator],userController.findUserById);

export default router;