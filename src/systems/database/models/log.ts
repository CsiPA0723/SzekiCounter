import { Model, ModelColumns } from "../basemodel";
import DataTypes from "../datatypes";
import { UserFactory } from "./user";

type PrimaryKey = { id: number };

type LogAttributes = PrimaryKey & {
  user_id: string;
  timestamp: Date;
  muted: 0 | 1;
  connect: 0 | 1;
  disconnect: 0 | 1;
  /** Left voice chat or muted themselfs without a word. */
  szekizett: 0 | 1;
};

class LogModel extends Model<LogAttributes, PrimaryKey> {
  public readonly tableName = "logs";
  public readonly columns: ModelColumns<LogAttributes> = {
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
    timestamp: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
    },
    muted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    connect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    disconnect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    szekizett: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  };
}

export const LogFactory = new LogModel();
