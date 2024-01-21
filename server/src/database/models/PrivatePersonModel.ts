import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from ".";
import Address from "./AddressModel";
import Contacts from "./ContactsModel";

class PrivatePerson extends Model<InferAttributes<PrivatePerson>, InferCreationAttributes<PrivatePerson>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare middleName: string;
  declare dateOfBirth: string;
  declare email: string;
  declare cpf: string;
  declare rg: string;
}

PrivatePerson.init(
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
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    cpf: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    rg: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "privatePersons",
    timestamps: false,
  }
);

PrivatePerson.hasMany(Address, {
  foreignKey: "privatePersonId",
  as: "address",
});

Address.belongsTo(PrivatePerson, {
  foreignKey: "privatePersonId",
  as: "address",
});

PrivatePerson.hasMany(Contacts, {
  foreignKey: "privatePersonId",
  as: "contacts",
});

Contacts.belongsTo(PrivatePerson, {
  foreignKey: "privatePersonId",
  as: "contacts",
});

export default PrivatePerson;
