const asyncHandler = require('express-async-handler');
const Products = require('.././models/productsMoldes')
const express = require('express');
const getProduct = asyncHandler(async (req, res) => {
    try {
        let { search, star,category, lowToHighPrice, highToLowPrice, avgReview, newest, page = 1, limit = 10 } = req.query;
        limit = parseInt(limit);
        search = search?.trim(); 
        // console.log(search)
        if (star) {
            limit = parseInt(limit);
            const result = await Products.find({star:star}).limit(limit * 1).skip((page - 1) * limit);
            const total = await Products.find({star:star}).limit(limit * 1).skip((page - 1) * limit).count();
            return res.status(200).json({total,products: result });
        } 
        if (lowToHighPrice) {
            
        }
        if (highToLowPrice) {

        }
        if (avgReview) {

        }
        if (newest) {

        }
        if (search) {
            const KeyWordRegExp = new RegExp(search, "i");
            const result = await Products.find({
                $or: [{ category: KeyWordRegExp }, { name: KeyWordRegExp }],
            }).sort({ name: -1, star: -1, starCount: -1 }).limit(limit * 1).skip((page - 1) * limit);
            const total = await Products.find({
                $or: [{ category: KeyWordRegExp }, { name: KeyWordRegExp }],
            }).count();
            return res.status(200).json({ total, products: result });
        } else {
            const result = await Products.find({}).sort({ name: -1, star: -1, starCount: -1, createdAt: -1, updatedAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
            const total = await Products.find({}).count();
            return res.status(200).json({ total, products: result });
        }
    } catch (error) {
        res.status(400).json({ error: { error: error.message } });
    }
})
const createProduct = asyncHandler(async (req, res) => {
    const { category, name, seller, wholePrice, priceFraction, stock, star, starCount, img, url, features, price } = req.body;
    const createProduct = new Products({
        category, name, seller, wholePrice, priceFraction, stock, star, starCount, img, url, features, price
    })
    await createProduct.save().then(savProduct => {
        if (savProduct !== createProduct) {
            return res.status(400).json({ error: { product: "product creatation failed!" } });
        } else {
            return res.status(201).json({ message: "product created successfully!", createProduct })
        }
    })
})
const starSearch = asyncHandler(async (req, res) => {
    let { star, page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const result = await Products.find({ star: star }).sort({ starCount: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await Products.find({ star: star }).sort({ starCount: -1 }).limit(limit * 1).skip((page - 1) * limit).count();
    return res.status(200).json({ total, products: result })
})
const priceLowSearch = asyncHandler(async (req, res) => {
    let { price, page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const result = await Products.find({ price: price }).sort({ price: 1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await Products.find({ price: price }).sort({ price: 1 }).limit(limit * 1).skip((page - 1) * limit).count();
    return res.status(200).json({ total, products: result })
})
const priceHighSearch = asyncHandler(async (req, res) => {
    let { price, page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    const result = await Products.find({ price: price }).sort({ price: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await Products.find({ price: price }).sort({ price: -1 }).limit(limit * 1).skip((page - 1) * limit).count();
    return res.status(200).json({ total, products: result })
})


module.exports = { getProduct, createProduct }