var Sequelize = require('sequelize');

var dbPath = process.env.DATABASE_URL || 'postgres://admin:test@localhost:5432/likedb';

var sequelize = new Sequelize(dbPath);

console.log('Database connected.');

module.exports = sequelize;
