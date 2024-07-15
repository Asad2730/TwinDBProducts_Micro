import { type Request, type Response } from "express";
import { Db } from "../conn/db";
import { Product } from "../entity/product";

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
        return res.status(201).json(results)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const GetByID = async (req: Request, res: Response) => {
    try {
        const product = await Db.getTreeRepository(Product).findOne(req.params)
        if (!product) {
            res.status(404).json(`product not found with id ${req.params}`)
            return
        }

        return res.status(200).json(product)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const UpdateByID = async (req: Request, res: Response) => {
    try {
        const product = await Db.getRepository(Product).findOne(req.params)
        if (!product) {
            res.status(404).json(`product not found with id ${req.params}`)
            return
        }

        Db.getRepository(Product).merge(product, req.body)
        const results = await Db.getRepository(Product).save(product)
        return res.status(200).json(results)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}


export const DeleteByID = async (req: Request, res: Response) => {
    try {
        const results = await Db.getRepository(Product).delete(req.params)
        return res.status(200).json(results)
    } catch (ex) {
        return res.status(500).json(ex)
    }
}