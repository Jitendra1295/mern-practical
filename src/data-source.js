require('dotenv').config();
const { DataSource } = require('typeorm');
const path = require('path');

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false, // we use migrations
  logging: false,
  entities: [path.join(__dirname, '/entities/*.js')],
  migrations: [path.join(__dirname, '/migration/*.js')]
});

module.exports = { AppDataSource };