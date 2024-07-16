import { Router } from 'express'
import {  GetAll, GetByID, IncrementLikeByID } from '../controller/product';


const app = Router();

app.get('/', GetAll)
app.get('/:id', GetByID)
app.post('/:id/like', IncrementLikeByID)


export const productRoutes = app;