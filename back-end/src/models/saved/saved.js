import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const Saved = sequelize.define('Saved', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  detailPath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'itemId', 'itemType'], // prevent duplicate saves
    }
  ]
});

export default Saved;