import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const University = sequelize.define('University', {
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
  location: DataTypes.STRING,
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
  website: {
    type: DataTypes.STRING,
    get() {
      return this.getDataValue('website') || this.getDataValue('original_link');
    },
  },
  original_link: DataTypes.STRING(512),
}, {
  tableName: 'university',
  timestamps: false,
});

// Associations will be defined in related models
export default University;
