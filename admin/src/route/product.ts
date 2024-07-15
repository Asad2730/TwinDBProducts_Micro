import {Router} from 'express'
import { Create, DeleteByID, GetAll, GetByID, UpdateByID } from '../controller/product';


const app = Router();

app.get('/',GetAll)
app.post('/',Create)
app.get('/:id',GetByID)
app.put('/:id',UpdateByID)
app.delete('/:id',DeleteByID)


export const productRoutes = app;