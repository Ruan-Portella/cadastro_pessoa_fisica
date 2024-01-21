import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from ".";

class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  declare id: CreationOptional<string>;
  declare street: string;
  declare number: string;
  declare complement: string;
  declare city: string;
  declare state: string;
  declare zipCode: string;
  declare privatePersonId: string;
}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privatePersonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "privatePersons", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "address_id",
    },
  },
  {
    sequelize: db,
    modelName: "address",
    tableName: "address",
    timestamps: false,
  }
);

export default Address;
