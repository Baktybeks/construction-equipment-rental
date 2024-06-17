const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Equipment = sequelize.define('Equipments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: false },
});

const Category = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
});

const Application = sequelize.define('Applications', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    processed: { type: DataTypes.BOOLEAN, defaultValue: false },
    approved: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const ApplicationEquipment = sequelize.define('ApplicationEquipment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

Category.hasMany(Equipment, { as: 'Category', foreignKey: 'CategoryId' });
Equipment.belongsTo(Category, { as: 'Category', foreignKey: 'CategoryId' });

Application.belongsToMany(Equipment, { through: ApplicationEquipment, as: 'Equipments', foreignKey: 'ApplicationId' });
Equipment.belongsToMany(Application, { through: ApplicationEquipment, as: 'Applications', foreignKey: 'EquipmentId' });

module.exports = {
    User, Equipment, Application, Category, ApplicationEquipment
};
