const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find({})
  const categoriesData = categories.map((category) => ({
    title: category.title,
    id: category._id,
    subcategories: category.subcategories.map((subcategory) => ({
      id: subcategory._id,
      title: subcategory.title,
    })),
  }))
  ctx.body = { categories: categoriesData }
};
