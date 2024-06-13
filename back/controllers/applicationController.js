const { Application, Equipment, Category } = require('../models/models');
const ApiError = require('../error/ApiError');


class ApplicationController {
    async create(req, res, next) {
        try {
            const { name, email, phone, description, processed, approved, EquipmentId } = req.body;
            const data = await Application.create({ name, email, phone, description, processed, approved, EquipmentId });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await Application.findAll({
            order: [
                [ 'processed', 'ASC' ],
                [ 'createdAt', 'DESC' ]
            ],
            include: [
                {
                    model: Equipment,
                    as: 'Equipment',
                    attributes: [ 'title', 'description', 'price', 'CategoryId' ],
                    include: [
                        {
                            model: Category,
                            as: 'Category',
                            attributes: [ 'category', 'image' ],
                        }
                    ]
                }
            ]
        });
        return res.json(data);
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Application.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Direction not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateProcessed(req, res, next) {
        try {
            const { id } = req.params;
            const { processed, approved } = req.body;

            const [updatedCount] = await Application.update(
                { processed, approved },
                { where: { id }, returning: true }
            );

            if (updatedCount === 1) {
                const updatedApplication = await Application.findByPk(id, {
                    include: [
                        {
                            model: Equipment,
                            as: 'Equipment',
                            attributes: ['title', 'description', 'price', 'CategoryId'],
                            include: [
                                {
                                    model: Category,
                                    as: 'Category',
                                    attributes: ['category', 'image', 'id'],
                                }
                            ]
                        }
                    ]
                });

                return res.json({
                    message: 'Updated successfully',
                    updatedApplication
                });
            } else {
                throw new Error('Application not found');
            }
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ApplicationController();
