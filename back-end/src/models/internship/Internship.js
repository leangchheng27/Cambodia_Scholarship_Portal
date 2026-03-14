import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const Internship = sequelize.define('Internship', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  company: DataTypes.STRING,
  duration: DataTypes.STRING(100),
  registration_link: DataTypes.STRING(512),
  image_url: DataTypes.STRING(512),
}, {
  tableName: 'internship',
  timestamps: false,
});

// Associations will be defined in related models
export default Internship;
