import Router from 'express'
import * as authorizationController from '../controller/authorization.controller' // es necesario * ya que sino el IDE no nos muestra los metodos de la clase
import {verifySignup} from '../middlewares'

const router = Router();

router.post('/signup', [verifySignup.checkIfExistsUsernameOrEmail, verifySignup.checkRolesExist],authorizationController.signUp);

router.post('/signin', authorizationController.signIn);

router.post('/signout', authorizationController.signOut);

export default router;