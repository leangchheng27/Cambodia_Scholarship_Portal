import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Scholarship from './Scholarship.js';

const ScholarshipDeadline = sequelize.define('ScholarshipDeadline', {
  scholarship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Scholarship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  institute: DataTypes.STRING,
  deadline: DataTypes.DATE,
}, {
  tableName: 'scholarship_deadline',
  timestamps: false,
});

// Define association
ScholarshipDeadline.belongsTo(Scholarship, { foreignKey: 'scholarship_id' });
Scholarship.hasMany(ScholarshipDeadline, { foreignKey: 'scholarship_id' });

export default ScholarshipDeadline;
