import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from ".";

class Contacts extends Model<InferAttributes<Contacts>, InferCreationAttributes<Contacts>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare typeContact: string;
  declare contact: string;
  declare privatePersonId: string;
}

Contacts.init(
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
    typeContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privatePersonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "privatePersons", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "contacts_id",
    },
  },
  {
    sequelize: db,
    modelName: "contacts",
    timestamps: false,
  }
);

export default Contacts;
