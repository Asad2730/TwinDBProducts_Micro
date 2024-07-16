import { Schema, Document, model } from 'mongoose';

export interface IProduct extends Document {
    admin_id: number;
    title: string;
    image: string;
    likes: number;
}

const ProductSchema: Schema = new Schema({
    admin_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, default: 0 }
})

 const  Product = model<IProduct>('Product',ProductSchema)

 export default Product
