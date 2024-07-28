const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "Batara48",
    database: "user-management-test",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "Batara48",
    database: "user-management-production",
    host: "localhost",
    dialect: "postgres",
  },
};
