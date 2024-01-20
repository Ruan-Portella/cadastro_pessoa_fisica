import { Options } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const config: Options = {
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'password',
  database: process.env.MYSQLDATABASE || 'cadastro_pessoa_fisica',
  host: process.env.MYSQLHOST || 'localhost',
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: "Z",
  },
  logging: false,
};

export = config;
