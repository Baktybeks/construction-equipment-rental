const { Application, Equipment, Category, ApplicationEquipment } = require('../models/models');
const ApiError = require('../error/ApiError');


class ApplicationController {
    async create(req, res, next) {
        try {
            const { name, email, phone, description, processed, approved, EquipmentIds } = req.body;
            if (!name || !email || !phone || !description) {
                throw new Error('All fields (name, email, phone, description) are required.');
            }

            const application = await Application.create({ name, email, phone, description, processed, approved });

            if (EquipmentIds && EquipmentIds.length > 0) {
                const equipments = await Equipment.findAll({
                    where: {
                        id: EquipmentIds
                    }
                });

                await application.addEquipments(equipments);
            }

            const applicationWithEquipments = await Application.findByPk(application.id, {
                include: {
                    model: Equipment,
                    as: 'Equipments'
                }
            });

            return res.json(applicationWithEquipments);
        } catch(e) {
            next(ApiError.badRequest(e.message));
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
                    as: 'Equipments',
                    attributes: ['id', 'title', 'image', 'description', 'price', 'CategoryId', 'createdAt', 'updatedAt'],
                    through: {
                        model: ApplicationEquipment,
                        attributes: ['id', 'createdAt', 'updatedAt', 'ApplicationId', 'EquipmentId']
                    },
                    include: [
                        {
                            model: Category,
                            as: 'Category',
                            attributes: ['category', 'image']
                        }
                    ]
                }
            ]
        });
        return res.json(data);
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const application = await Application.findByPk(id,
                {
                    include: [
                        {
                            model: Equipment,
                            as: 'Equipments',
                            attributes: ['id', 'title', 'image', 'description', 'price', 'CategoryId', 'createdAt', 'updatedAt'],
                            through: {
                                model: ApplicationEquipment,
                                attributes: ['id', 'createdAt', 'updatedAt', 'ApplicationId', 'EquipmentId']
                            },
                            include: [
                                {
                                    model: Category,
                                    as: 'Category',
                                    attributes: ['category', 'image']
                                }
                            ]
                        }
                    ]
                }
            );

            if (!application) {
                throw new Error('Application not found');
            }

            return res.json(application);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Application.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Application not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateProcessed(req, res, next) {
        try {
            const { id } = req.params;
            const { processed, approved } = req.body;

            const [ updatedCount ] = await Application.update(
                { processed, approved },
                { where: { id }, returning: true }
            );

            if (updatedCount === 1) {
                const updatedApplication = await Application.findByPk(id, {
                    include: [
                        {
                            model: Equipment,
                            as: 'Equipments',
                            attributes: [ 'title', 'description', 'price', 'CategoryId' ],
                            include: [
                                {
                                    model: Category,
                                    as: 'Category',
                                    attributes: [ 'category', 'image', 'id' ]
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
