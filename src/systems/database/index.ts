import { Connection, createConnection } from "mariadb";
import logger from "../../logger";
import { LogFactory } from "./models/log";

export function Connect(): Promise<Connection> {
  try {
    //if (connection?.isValid()) connection.end();
    const connection = createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      bigNumberStrings: true,
    }).then((conn) => {
      logger.info(`Connected to database! (id: ${conn.threadId})`);

      conn.on("error", (err) => {
        if (err.code === "ER_SOCKET_UNEXPECTED_CLOSE") {
          logger.warn(`Caught ER_SOCKET_UNEXPECTED_CLOSE! (id: ${conn.threadId})`);
          Connect();
        }
      });

      return conn;
    });

    return Promise.resolve(connection);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const connection = Connect();

export const Log = LogFactory.define();
