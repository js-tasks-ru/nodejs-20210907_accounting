const Product = require('../models/Product');
module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const query = ctx.request.query.query;
  if (!query) {
    return ctx.throw(400, 'No query');
  }

  let products = await Product.find({ $text: { $search: query } })

  products = products.map((product) => ({
    id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    subcategory: product.subcategory,
    images: product.images,
  }))
  ctx.body = { products };
};
