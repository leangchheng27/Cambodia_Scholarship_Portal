import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const Scholarship = sequelize.define('Scholarship', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  funded_by: DataTypes.STRING,
  course_duration: DataTypes.STRING(100),
  registration_link: DataTypes.STRING(512),
  image_url: DataTypes.STRING(512),
}, {
  tableName: 'scholarship',
  timestamps: false,
});

export default Scholarship;
