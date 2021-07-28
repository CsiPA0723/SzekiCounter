import logger from "../../logger";
import DataTypes from "./datatypes";
import buildColumnsFrom from "./utils/buildColumnsFrom";
import buildWhereClauseFrom from "./utils/buildWhereClauseFrom";
import { connection } from "./";

export type ModelColumns<T> = {
  [Property in keyof T]: {
    type: DataTypes | string;
    primaryKey?: boolean;
    allowNull?: boolean;
    defaultValue?: T[Property];
    autoIncrement?: boolean;
    unique?: boolean;
    references?: {
      table: string;
      foreignKey: string;
    };
  };
};

export abstract class Model<Attributes, PrimaryKey> {
  public abstract tableName: string;
  public abstract columns: ModelColumns<Attributes>;

  private isNotDefined = true;

  public async findByPK(primaryKey: PrimaryKey): Promise<Attributes> {
    if (this.isNotDefined) throw new Error("Model is not defined!");
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE ${Object.getOwnPropertyNames(primaryKey)[0]} = ?;`;
      const rows: Attributes[] = await (await connection).query(sql, [primaryKey]);
      return Promise.resolve(rows?.[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteByPk(primaryKey: PrimaryKey): Promise<unknown[]> {
    if (this.isNotDefined) throw new Error("Model is not defined!");
    try {
      const sql = `DELETE FROM ${this.tableName} WHERE ${Object.getOwnPropertyNames(primaryKey)[0]} = ?;`;
      const rows: unknown[] = await (await connection).query(sql, [primaryKey]);
      return Promise.resolve(rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** @param where - `[{foo: foo}, "AND", {bar: bar}, "OR", {fooBar: foo.bar}]` */
  private async find(where: Partial<Attributes | "OR" | "AND" | "NOT">[]): Promise<Attributes[]> {
    if (this.isNotDefined) throw new Error("Model is not defined!");
    const { data, whereString } = buildWhereClauseFrom(where);
    const sql = `SELECT * FROM ${this.tableName} WHERE ${whereString};`;
    try {
      const rows: Attributes[] = await (await connection).query({ namedPlaceholders: true, sql }, data);
      return Promise.resolve(rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** @param where - `[{foo: foo}, "AND", {bar: bar}, "OR", {fooBar: foo.bar}]` */
  public async findOne(where: Partial<Attributes | "OR" | "AND" | "NOT">[]): Promise<Attributes> {
    try {
      const rows = await this.find(where);
      return Promise.resolve(rows?.[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** @param where - `[{foo: foo}, "AND", {bar: bar}, "OR", {fooBar: foo.bar}]` */
  public async findAll(where: Partial<Attributes | "OR" | "AND" | "NOT">[]): Promise<Attributes[]> {
    try {
      const rows = await this.find(where);
      return Promise.resolve(rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async create(data: Attributes): Promise<{ runResult: unknown[]; object: Attributes }> {
    const propNames = Object.getOwnPropertyNames(data);
    const sql = `INSERT INTO ${this.tableName} (${propNames.join(", ")}) VALUES (:${propNames.join(", :")});`;
    try {
      const rows: unknown[] = await (await connection).query({ namedPlaceholders: true, sql }, data);
      return Promise.resolve({ runResult: rows, object: data });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public define(): this {
    if (!this.isNotDefined) throw new Error("Model alredy defined!");
    try {
      connection.then((conn) => {
        conn.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (${buildColumnsFrom(this.columns).join(", ")});`);
      });
      this.isNotDefined = false;
      return this;
    } catch (error) {
      logger.error(error?.stack || error || `${error}`);
    }
  }
}
