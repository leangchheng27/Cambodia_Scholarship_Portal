import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import University from './University.js';

const UniversityCampus = sequelize.define('UniversityCampus', {
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: University,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  image_url: DataTypes.STRING(512),
}, {
  tableName: 'university_campus',
  timestamps: false,
});

// Define association
UniversityCampus.belongsTo(University, { foreignKey: 'university_id' });
University.hasMany(UniversityCampus, { foreignKey: 'university_id' });

export default UniversityCampus;
