import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const Scholarship = sequelize.define('Scholarship', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('name');
    },
  },
  description: DataTypes.TEXT,
  funded_by: DataTypes.STRING,
  course_duration: DataTypes.STRING(100),
  registration_link: DataTypes.STRING(512),
  poster_image_url: DataTypes.STRING(512),
  slider_image_url: DataTypes.STRING(512),
  image_url: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('poster_image_url');
    },
  },
  image: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('poster_image_url');
    },
  },
}, {
  tableName: 'scholarship',
  timestamps: false,
});

// Associations will be defined in related models
export default Scholarship;
