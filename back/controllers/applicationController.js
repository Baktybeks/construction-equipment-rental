const {Application, Equipment, Category } = require('../models/models')
const ApiError = require('../error/ApiError')


class ApplicationController {
  async create(req, res, next) {
    try {
      const {name, email, phone, description, processed, EquipmentId} = req.body
      const data = await Application.create({name, email, phone, description, processed, EquipmentId})
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    const data = await Application.findAll({
      order: [
        ['processed', 'ASC'],
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: Equipment,
          as: 'Equipment',
          attributes: [  'title', 'description', 'price', 'CategoryId' ],
          include: [
            {
              model: Category,
              as: 'Category',
              attributes: [  'category', 'image'  ],
            }
          ]
        }
      ]
    });
    return res.json(data)
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Application.destroy({ where: { id } });
      if (deleted) {
        return res.json({ message: "Deleted successfully" });
      }
      throw new Error("Direction not found");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateProcessed(req, res, next) {
    try {
      const { id } = req.params;
      const { processed } = req.body;

      const updatedApplication = await Application.update(
        { processed },
        { where: { id } }
      );

      if (updatedApplication[0] === 1) {
        return res.json({ message: "Processed updated successfully" });
      } else {
        throw new Error("Application not found");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ApplicationController()
