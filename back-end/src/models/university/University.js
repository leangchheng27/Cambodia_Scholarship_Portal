import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

const DEMO_POSTER_URL = 'https://csp-media.sgp1.cdn.digitaloceanspaces.com/universities/posters/demo-pic.png';

const resolveImageUrl = (url) => {
  if (!url) {
    return DEMO_POSTER_URL;
  }

  const normalized = String(url).trim();
  if (!/^https?:\/\//i.test(normalized)) {
    return DEMO_POSTER_URL;
  }

  return normalized;
};

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
      // Keep request compatibility even when the DB does not have slider_image_url.
      this.setDataValue('image_url', value);
    },
  },
  image: {
    type: DataTypes.VIRTUAL,
    get() {
      return resolveImageUrl(this.getDataValue('image_url'));
    },
  },
  website: DataTypes.STRING(512),
  original_link: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('website');
    },
    set(value) {
      this.setDataValue('website', value);
    },
  },
}, {
  tableName: 'university',
  timestamps: false,
});

// Associations will be defined in related models
export default University;
