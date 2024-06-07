const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Equipment = sequelize.define('Equipment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: false },
});

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
});

const Application = sequelize.define('Application', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    EquipmentId: { type: DataTypes.INTEGER, allowNull: false },
    processed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Category.hasMany(Equipment, { as: 'Category', foreignKey: 'CategoryId' });
Equipment.belongsTo(Category, { as: 'Category', foreignKey: 'CategoryId' });

Equipment.hasMany(Application, { as: 'Equipment', foreignKey: 'EquipmentId' });
Application.belongsTo(Equipment, { as: 'Equipment', foreignKey: 'EquipmentId' });

module.exports = {
    User, Equipment, Application, Category
};





