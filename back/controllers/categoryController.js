const { Category } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid');
const path = require('path');


class CategoryController {

  async create(req, res, next) {
    try {
      const {category} = req.body
      const { image } = req.files;
      let fileName = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', fileName));
      const data = await Category.create({category, image: fileName})
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    const data = await Category.findAndCountAll()
    return res.json(data)
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Category.destroy({ where: { id } });
      if (deleted) {
        return res.json({ message: "Deleted successfully" });
      }
      throw new Error("Category not found");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CategoryController()
