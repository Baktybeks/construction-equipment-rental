const { Equipment, Category } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class EquipmentController {
  async create(req, res, next) {
    try {
      const { title, description, price, CategoryId } = req.body;
      const { image } = req.files;
      let fileName = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', fileName));
      const data = await Equipment.create({
        title, description, price, CategoryId, image: fileName
      });
      return res.json(data);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const data = await Equipment.findAndCountAll({
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: [  'category', 'image'  ],
        }
      ]
    });
    return res.json(data);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const data = await Equipment.findOne(
      {
        where: { id }
      }
    );
    return res.json(data);
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Equipment.destroy({ where: { id } });
      if (deleted) {
        return res.json({ message: 'Deleted successfully' });
      }
      throw new Error('Equipment not found');
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new EquipmentController();
