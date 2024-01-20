import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from ".";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: CreationOptional<string>;
  declare telephone: string;
  declare profileImage: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    telephone: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    profileImage: {
      allowNull: true,
      type: DataTypes.TEXT('long'),
    },
  },
  {
    sequelize: db,
    modelName: "users",
    timestamps: false,
  }
);

export default User;
