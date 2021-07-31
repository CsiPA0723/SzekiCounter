import { Model, ModelColumns } from "../basemodel";
import DataTypes from "../datatypes";
import { UserFactory } from "./user";

type PrimaryKey = { id: number };

type LogAttributes = PrimaryKey & {
  user_id: string;
  timestamp: string;
  muted: boolean;
  joined: boolean;
  left: boolean;
  /** Left voice chat or muted themselfs without a word. */
  szekizett: boolean;
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
      unique: true,
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
      defaultValue: false,
    },
    joined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    left: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    szekizett: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };
}

export const LogFactory = new LogModel();
