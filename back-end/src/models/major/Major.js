import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const Major = sequelize.define('Major', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stream: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'science, social, commerce, etc.'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'major',
  timestamps: true,
});

export default Major;
