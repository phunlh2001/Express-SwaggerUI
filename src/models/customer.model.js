import { DataTypes } from "sequelize";

function CustomerModel(sequelize) {
  const attributes = {
    fullName: { type: DataTypes.STRING, allowNull: false },
    birthday: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("Customers", attributes);
}

export default CustomerModel;
