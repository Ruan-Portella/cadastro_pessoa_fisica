import { Model, QueryInterface, DataTypes } from "sequelize";
import IContacts from "../Interfaces/IContactsModel";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IContacts>>("contacts", {
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
      typeContact: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contact: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      privatePersonId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "privatePersons", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "contacts_id",
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("contacts");
  },
};
