import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import University from './University.js';

const UniversityTuitionFee = sequelize.define('UniversityTuitionFee', {
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: University,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  student_type: DataTypes.STRING,
  amount: DataTypes.DECIMAL(10,2),
  note: DataTypes.TEXT,
}, {
  tableName: 'tuition_fee',
  timestamps: false,
});

export default UniversityTuitionFee;
