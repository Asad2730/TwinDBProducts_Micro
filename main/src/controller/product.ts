import type { Request, Response } from "express";
import type { IProduct } from "../model/product";
import Product from "../model/product";
import axios from "axios";




// export const Create = async (req: Request, res: Response) => {
//     try {
//         const product: IProduct = req.body
//         const result = await Product.create(product)
//         return res.status(201).json(result)
//     } catch (ex) {
//         res.status(500).json(ex)
//     }
// }




export const GetAll = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        return res.status(201).json(products)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const GetByID = async (req: Request, res: Response) => {
    try {
        const admin_id: number = parseInt(req.params.id);
        const product = await Product.findOne({ admin_id: admin_id })
        if (!product) return res.status(404).json(`Product not found by ${admin_id}`)
        return res.status(200).json(product)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


// export const UpdateByID = async (req: Request, res: Response) => {
//     try {
//         const admin_id: number = parseInt(req.params.id);
//         const update_product: IProduct = req.body
//         const product = await Product.updateOne({ admin_id: admin_id }, { $set: update_product }, { new: true })
//         if (product.modifiedCount === 0) return res.status(404).json(`Product not found by ${admin_id}`)
//         return res.status(200).json(product)
//     } catch (ex) {
//         return res.status(500).json(ex)
//     }
// }

// export const DeleteByID = async (req: Request, res: Response) => {
//     try {
//         const admin_id: number = parseInt(req.params.id);
//         const product = await Product.deleteOne({ admin_id: admin_id })
//         if (product.deletedCount === 0) return res.status(404).json(`product not found by id ${admin_id}`)
//         return res.status(200).json(product)

//     } catch (ex) {
//         return res.status(500).json(ex)
//     }
// }


export const IncrementLikeByID = async (req: Request, res: Response) => {
    try {
        const admin_id: number = parseInt(req.params.id);
        const product = await Product.findOne({ admin_id: admin_id })
        if (!product) return res.status(404).json(`Product not found by ${admin_id}`);
        await axios.get(`http://localhost:8080/api/products/${admin_id}/like`);
        product.likes++;
        await product.save()
        return res.status(200).json(product)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}