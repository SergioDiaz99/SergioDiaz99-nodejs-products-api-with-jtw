import express from 'express';
import productRoutes from './routes/products.routes'
import userRoutes from './routes/user.routes'
import authorizationRoutes from './routes/auth.routes'
import morgan from 'morgan'//permite ver las peticiones que van llegando
import cors from 'cors'
import {createRoles} from './libs/initialSetup'

const app = express();
createRoles();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
//It is necesary to read properly the body of the request 
app.use(morgan('dev'));
app.use(cors());//cualquier servidor puede realizar peticiones en la aplicacion
app.use(express.json());//permite comprender los objetos json que recibe el servidor
app.use(express.urlencoded({extended: false}));//permite entender las peticiones a traves de formularios html


app.use('/api/product',productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/auth',authorizationRoutes);

export default app;