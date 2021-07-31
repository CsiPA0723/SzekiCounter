import logger from "../../logger";
import DataTypes from "./datatypes";
import buildColumnsFrom from "./utils/buildColumnsFrom";
import buildWhereClauseFrom from "./utils/buildWhereClauseFrom";
import buildUpdateSetsFrom from "./utils/buildUpdateSetsFrom";
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

type PartialNulls<T> = {
  [P in keyof T]+?: null;
};

export abstract class Model<Attributes, PrimaryKey> {
  public abstract tableName: string;
  public abstract columns: ModelColumns<Attributes>;

  private isDefined = false;

  public async findByPK(primaryKey: PrimaryKey): Promise<Attributes> {
    if (!this.isDefined) throw new Error("Model is not defined!");
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE ${Object.getOwnPropertyNames(primaryKey)[0]} = ?;`;
      const rows: Attributes[] = await (await connection).query(sql, [primaryKey]);
      return Promise.resolve(rows?.[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteByPk(primaryKey: PrimaryKey): Promise<unknown[]> {
    if (!this.isDefined) throw new Error("Model is not defined!");
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
    if (!this.isDefined) throw new Error("Model is not defined!");
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
    if (!this.isDefined) throw new Error("Model is not defined!");
    const propNames = Object.getOwnPropertyNames(data);
    const sql = `INSERT INTO ${this.tableName} (${propNames.join(", ")}) VALUES (:${propNames.join(", :")});`;
    try {
      const rows: unknown[] = await (await connection).query({ namedPlaceholders: true, sql }, data);
      return Promise.resolve({ runResult: rows, object: data });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @param data - Every field must have a value or set to null.
   * - Like: `{ id: foo.id, bar: null }`
   * @param excludeData - Set fields to null to exclude them from updating
   *  - Defaults to `{}`
   */
  public async upsert(data: Attributes, excludeData?: PartialNulls<Attributes>): Promise<unknown> {
    if (!this.isDefined) throw new Error("Model is not defined!");
    const propNames = Object.getOwnPropertyNames(data);

    const updateData: PartialNulls<Attributes> = {
      ...data,
      // Exclude fields in the update statement by setting them to null
      ...excludeData,
    };
    const sql = `
      INSERT INTO ${this.tableName} (${propNames}) VALUES (:${propNames.join(", :")})
      ON DUPLICATE KEY UPDATE ${buildUpdateSetsFrom(updateData)};
    `;
    try {
      const rows = await (await connection).query({ namedPlaceholders: true, sql }, data);
      return Promise.resolve(rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** @param where - `[{foo: foo}, "AND", {bar: bar}, "OR", {fooBar: foo.bar}]` */
  public async update(
    data: Partial<Attributes>,
    where: Partial<Attributes | "OR" | "AND" | "NOT">[]
  ): Promise<unknown> {
    if (!this.isDefined) throw new Error("Model is not defined!");
    const { data: whereData, whereString } = buildWhereClauseFrom(where);
    const sql = `UPDATE ${this.tableName} SET ${buildUpdateSetsFrom(data)} WHERE ${whereString};`;
    try {
      const rows = await (await connection).query({ namedPlaceholders: true, sql }, Object.assign(data, whereData));
      return Promise.resolve(rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public define(): this {
    if (this.isDefined) throw new Error("Model alredy defined!");
    try {
      connection.then((conn) => {
        conn.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (${buildColumnsFrom(this.columns).join(", ")});`);
      });
      this.isDefined = true;
      return this;
    } catch (error) {
      logger.error(error?.stack || error || `${error}`);
    }
  }
}
