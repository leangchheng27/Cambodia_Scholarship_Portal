import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import University from './University.js';

const UniversityMajor = sequelize.define('UniversityMajor', {
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: University,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  degree_level: DataTypes.STRING,
  specialization: DataTypes.STRING,
}, {
  tableName: 'university_major',
  timestamps: false,
});

// Define association
UniversityMajor.belongsTo(University, { foreignKey: 'university_id' });
University.hasMany(UniversityMajor, { foreignKey: 'university_id' });

export default UniversityMajor;
