const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)
const featuresSchema = mongoose.Schema(
    {
        description:{
            type:String,
            required: [true,"description is required!"],
        },
        value: {
            type:String,
            required: [true,"value is required!"],
        }
    },
    {
        description:{
            type:String,
            required: [true,"description is required!"],
        },
        value: {
            type:String,
            required: [true,"value is required!"],
        },
        price:{
            type:String,
            required:[true,"price is required!"]
        },
        shipping:{
            type:String,
            required: [true, "shipping is required!"]
        }
    },

)
const productSchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "Category is required!"],
    },
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    seller: {
        type: String,
        required: [true, "Seller is required!"]
    },
    wholePrice: {
        type: String,
        required: [true, "Whole Price is required!"]
    },
    priceFraction: {
        type: String,
        required: [true, "Price Fraction is required!"]
    },
    stock: {
        type: String,
        required: [true, "Stock is required!"]
    },
    reviews: [],
    star: {
        type: Number,
        required: true,
        default: 0,
    },
    starCount: {
        type: Number,
        required: true,
        default: 0,
    },
    img: {
        type: String,
        required: [true, "Product Image is required!"]
    },
    url: {
        type: String
    },
    features: [featuresSchema]
},
{
    timestamps: true,
}
)
const Products = mongoose.model("Products",productSchema);
module.exports = Products;