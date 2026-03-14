import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const University = sequelize.define('University', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  location: DataTypes.STRING,
  image_url: DataTypes.STRING(512),
  website: DataTypes.STRING,
}, {
  tableName: 'university',
  timestamps: false,
});

// Associations will be defined in related models
export default University;
