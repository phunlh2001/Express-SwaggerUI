import tedious from "tedious";
import { Sequelize } from "sequelize";
import customerModel from "./models/customer.model.js";

import application from "../applications.json" assert { type: "json" };

const { dbConfig, dbName } = application;

const db = {};

initialize();

async function initialize() {
  const dialect = "mssql";
  const host = dbConfig.server;
  const { userName, password } = dbConfig.authentication.options;

  // create db if it doesn't already exist
  await ensureDbExists(dbName);

  // connect to db
  const sequelize = new Sequelize(dbName, userName, password, {
    host,
    dialect,
  });

  // init model and add them to the exported db object
  db.Customer = customerModel(sequelize);

  // sync model with database
  await sequelize.sync({ alter: true });
}

async function ensureDbExists(dbName) {
  return new Promise((resolve, reject) => {
    const connection = new tedious.Connection(dbConfig);
    connection.connect((err) => {
      if (err) {
        console.log("err:", err);
        reject(`Connection failed: ${err.message}`);
      }

      const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name='${dbName}') CREATE DATABASE [${dbName}];`;
      const request = new tedious.Request(createDbQuery, (err) => {
        if (err) {
          console.log("err", err);
          reject(`Create DB query failed: ${err.message}`);
        }

        resolve(); // query excuted successfully
      });

      connection.execSql(request);
    });
  });
}

export { db };
