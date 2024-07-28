import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbName = process.env.PGDATABASE as string;
const dbHost = process.env.PGHOST;
const dbUsername = process.env.PGUSERNAME as string;
const dbPassword = process.env.PGPASSWORD;
const dbDialect = "postgres";

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

export default sequelizeConnection;
