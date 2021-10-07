const mongoose = require('mongoose');
const Product = require('../models/Product');
module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const { subcategory } = ctx.query;

  if (!subcategory) return next();
  const products = await Product.find({ subcategory })
  if (products.length) {
    const productsList = products.map((product) => ({
      title: product.title,
      id: product._id,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description
    }))
    ctx.body = { products: productsList };
  }
  else ctx.body = { products: [] };
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find({})
  if (products.length) {
    const productsList = products.map((product) => ({
      title: product.title,
      id: product._id,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description
    }))
    ctx.body = { products: productsList };
  }
  else ctx.body = { products: [] };
};

module.exports.productById = async function productById(ctx, next) {
  const { id } = ctx.params
  if (!mongoose.isValidObjectId(id)) {
    ctx.status = 400;
    ctx.body = 'Bad request'
    return
  }

  const product = await Product.findById(id)
  if (!product) {
    ctx.status = 404;
    ctx.body = 'Product not found'
    return
  }

  const productTransformed = {
    title: product.title,
    id: product._id,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description
  }

  ctx.body = { product: productTransformed };
};

