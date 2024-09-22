import { DataTypes } from 'sequelize';

const TransactionModel = (sequelize, Configuration) => {
  return sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    configurationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Configuration,
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};

export default TransactionModel;
