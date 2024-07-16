import { Router } from 'express'
import { Create, DeleteByID, GetAll, GetByID, IncrementLikeByID, UpdateByID } from '../controller/product';


const app = Router();

app.get('/', GetAll)
app.post('/', Create)
app.get('/:id', GetByID)
app.put('/:id', UpdateByID)
app.delete('/:id', DeleteByID)
app.post('/:id/like', IncrementLikeByID)


export const productRoutes = app;