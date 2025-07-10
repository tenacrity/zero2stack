// src/models/task.js
import { DataTypes } from 'sequelize';

export const defineTaskModel = (sequelize) => {
  return sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'tasks', // 👈 ensures Sequelize maps to lowercase table
    timestamps: true,
  });
};
