/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-05-06 23:40:43
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-03 23:05:58
 * @FilePath: /node/src/config/index.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  options: {
    swaggerDefinition: {
      info: {
        description: "Api测试",
        title: "Swagger",
        version: require("../../package.json").version,
      },
      host: `localhost:${parseInt(process.env.PORT, 10)}`,
      basePath: "/",
      produces: ["application/json", "application/xml"],
      schemes: ["http", "https"],
      securityDefinitions: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Bearer Authorization",
        },
      },
    },
    route: {
      url: "./swagger-ui.html",
      // swagger文件 api
      docs: "/swagger.json",
    },
    // app absolute path
    basedir: __dirname,
    // path to the API handle folder
    files: ["../router/*.ts"],
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },
  mysql: {
    host: "localhost",
    charset: "utf8_general_ci",
    user: "root",
    password: "1234567",
  },
  mongodb: {},
  sqlite: {},
  api: {
    prefix: "/api",
  },
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
