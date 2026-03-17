import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const DEMO_POSTER_URL = 'https://csp-media.sgp1.cdn.digitaloceanspaces.com/universities/posters/demo-pic.png';

const resolveImageUrl = (url) => {
  if (!url) {
    return DEMO_POSTER_URL;
  }

  const normalized = String(url).trim();
  if (!/^\https?:\/\//i.test(normalized)) {
    return DEMO_POSTER_URL;
  }

  return normalized;
};

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
  type: {
    type: DataTypes.ENUM('cambodia', 'abroad', 'internship'),
    defaultValue: 'cambodia',
    allowNull: false,
  },
  funded_by: DataTypes.STRING,
  course_duration: DataTypes.STRING(100),
  registration_link: DataTypes.STRING(512),
  original_link: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('registration_link');
    },
    set(value) {
      this.setDataValue('registration_link', value);
    },
  },
  image_url: DataTypes.STRING(512),
  poster_image_url: {
    type: DataTypes.VIRTUAL,
    get() {
      return resolveImageUrl(this.getDataValue('image_url'));
    },
    set(value) {
      this.setDataValue('image_url', value);
    },
  },
  slider_image_url: {
    type: DataTypes.VIRTUAL,
    get() {
      return resolveImageUrl(this.getDataValue('image_url'));
    },
    set(value) {
      // Preserve request compatibility when slider-specific DB column is absent.
      this.setDataValue('image_url', value);
    },
  },
  image: {
    type: DataTypes.VIRTUAL,
    get() {
      return resolveImageUrl(this.getDataValue('image_url'));
    },
  },
  details: DataTypes.JSON,
  ai_metadata: DataTypes.JSON,
}, {
  tableName: 'scholarship',
  timestamps: false,
});

// Associations will be defined in related models
export default Scholarship;
