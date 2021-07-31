import { Model, ModelColumns } from "../basemodel";
import DataTypes from "../datatypes";
import { UserFactory } from "./user";

type PrimaryKey = { id: number };

type MonthAttributes = PrimaryKey & {
  user_id: string;
  date: Date;
  active_time: number;
  inactive_time: number;
  /** Left voice chat or muted themselfs without a word. */
  szekizes: number;
};

class MonthModel extends Model<MonthAttributes, PrimaryKey> {
  public readonly tableName = "months";
  public readonly columns: ModelColumns<MonthAttributes> = {
    id: {
      type: `${DataTypes.INT}(10) unsigned`,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: `${DataTypes.BIGINT}(20) unsigned`,
      references: {
        table: UserFactory.tableName,
        foreignKey: nameof(UserFactory.columns.id),
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    active_time: {
      type: `${DataTypes.BIGINT}(20) unsigned`,
      defaultValue: 0,
      allowNull: false,
    },
    inactive_time: {
      type: `${DataTypes.BIGINT}(20) unsigned`,
      defaultValue: 0,
      allowNull: false,
    },
    szekizes: {
      type: `${DataTypes.INT}(10) unsigned`,
      defaultValue: 0,
      allowNull: false,
    },
  };
}

export const MonthFactory = new MonthModel();
