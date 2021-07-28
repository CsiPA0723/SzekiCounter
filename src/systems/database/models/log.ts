import { Model, ModelColumns } from "../basemodel";
import DataTypes from "../datatypes";

type PrimaryKey = { id: number };

type LogAttributes = PrimaryKey & {
  timestamp: string;
  muted: boolean;
};

class LogModel extends Model<LogAttributes, PrimaryKey> {
  public tableName = "logs";
  public columns: ModelColumns<LogAttributes> = {
    id: {
      type: `${DataTypes.INT}(10) unsigned`,
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
    },
    muted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };
}

export const LogFactory = new LogModel();
