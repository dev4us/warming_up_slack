// Connection 은 나중에 추가하기
import { ConnectionOptions, createConnection, Connection } from "typeorm";

const dotenv = require("dotenv");
dotenv.config();

// 1. type을 불러왔을 때 아래 자동완성으로 보여주는지 보여주기
const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "warming_slack",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

const connection: Promise<Connection> = createConnection(connectionOptions);

export default connection;
