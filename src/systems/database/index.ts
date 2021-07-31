import { Connection, createConnection } from "mariadb";
import logger from "../../logger";
import { LogFactory } from "./models/log";
import { MonthFactory } from "./models/month";
import { UserFactory } from "./models/user";

let conn: Connection;

export async function Connect(): Promise<Connection> {
  try {
    if (conn?.isValid()) conn.end();
    conn = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      bigNumberStrings: true,
    });

    logger.info(`Connected to database! (id: ${conn.threadId})`);

    conn.on("error", (err) => {
      if (err.code === "ER_SOCKET_UNEXPECTED_CLOSE") {
        logger.warn(`Caught ER_SOCKET_UNEXPECTED_CLOSE! (id: ${conn.threadId})`);
        Connect();
      }
    });

    return Promise.resolve(conn);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const connection = Connect();

export const User = UserFactory.define();
export const Log = LogFactory.define();
export const Month = MonthFactory.define();
