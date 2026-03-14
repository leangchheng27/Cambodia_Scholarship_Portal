import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import University from './University.js';

const UniversityNews = sequelize.define('UniversityNews', {
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: University,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  image_url: DataTypes.STRING(512),
  published_at: DataTypes.DATE,
}, {
  tableName: 'university_news',
  timestamps: false,
});

// Define association
UniversityNews.belongsTo(University, { foreignKey: 'university_id' });
University.hasMany(UniversityNews, { foreignKey: 'university_id' });

export default UniversityNews;
