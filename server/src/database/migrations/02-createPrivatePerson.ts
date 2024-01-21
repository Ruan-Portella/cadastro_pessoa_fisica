import { Model, QueryInterface, DataTypes } from "sequelize";
import IPrivatePerson from "../Interfaces/IPrivatePersonModel";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IPrivatePerson>>("privatePersons", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      middleName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        allowNull: false,
        type: DataTypes.STRING,
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
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("privatePersons");
  },
};
