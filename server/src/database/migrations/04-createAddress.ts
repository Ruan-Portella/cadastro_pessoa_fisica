import { Model, QueryInterface, DataTypes } from "sequelize";
import IAddress from "../Interfaces/IAddressModel";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IAddress>>("address", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      street: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      complement: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      zipCode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      privatePersonId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "privatePersons", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "address_id",
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("address");
  },
};
