import { type Request, type Response } from "express";
import { channel, Db } from "../conn/db";
import { Product } from "../entity/product";
import { type DeepPartial } from "typeorm";

export const GetAll = async (req: Request, res: Response) => {
    try {
        const products = await Db.getRepository(Product).find()
        return res.status(200).json(products)
    } catch (ex) {
        return res.status(500).json(ex)
    }
};


export const Create = async (req: Request, res: Response) => {
    try {
        const product = await Db.getRepository(Product).create(req.body)
        const results = await Db.getRepository(Product).save(product)
        await channel.sendToQueue('product_created', Buffer.from(JSON.stringify(results)))
        return res.status(201).json(results)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const GetByID = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id)
        const product = await Db.getTreeRepository(Product).findOneByOrFail({ id: id })
        return res.status(200).json(product)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const UpdateByID = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id)
        const product = await Db.getRepository(Product).findOneByOrFail({ id: id })
        Db.getRepository(Product).merge(product, req.body)
        const results = await Db.getRepository(Product).save(product)
        await channel.sendToQueue('product_updated', Buffer.from(JSON.stringify(results)))
        return res.status(200).json(results)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const DeleteByID = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id)
        const results = await Db.getRepository(Product).delete(id)
        await channel.sendToQueue('product_deleted', Buffer.from(id.toString()))
        return res.status(200).json(results)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const IncrementLikeByID = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id)
        const product = await Db.getRepository(Product).findOneByOrFail({ id })
        if (!product) {
            res.status(404).json(`product not found with id ${req.params}`)
            return
        }

        product.likes++
        const result = await Db.getRepository(Product).save(product as DeepPartial<Product>);
        return res.status(200).json(result)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}
