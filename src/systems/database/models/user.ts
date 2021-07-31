import { Model, ModelColumns } from "../basemodel";
import DataTypes from "../datatypes";

type PrimaryKey = { id: string };

type UserAttributes = PrimaryKey & {
  nickname: string;
  active_time: number;
  inactive_time: number;
  /** Left voice chat or muted themselfs without a word. */
  szekizes: number;
};

class UserModel extends Model<UserAttributes, PrimaryKey> {
  public readonly tableName = "users";
  public readonly columns: ModelColumns<UserAttributes> = {
    id: {
      type: `${DataTypes.BIGINT}(20) unsigned`,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.TEXT,
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

export const UserFactory = new UserModel();
