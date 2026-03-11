import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Scholarship from './Scholarship.js';

const ScholarshipFieldOfStudy = sequelize.define('ScholarshipFieldOfStudy', {
  scholarship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Scholarship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  field_name: DataTypes.STRING,
}, {
  tableName: 'scholarship_field_of_study',
  timestamps: false,
});

// Define association
ScholarshipFieldOfStudy.belongsTo(Scholarship, { foreignKey: 'scholarship_id' });
Scholarship.hasMany(ScholarshipFieldOfStudy, { foreignKey: 'scholarship_id' });

export default ScholarshipFieldOfStudy;
