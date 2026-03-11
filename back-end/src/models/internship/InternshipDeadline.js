import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Internship from './Internship.js';

const InternshipDeadline = sequelize.define('InternshipDeadline', {
  internship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Internship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  institute: DataTypes.STRING,
  deadline: DataTypes.DATE,
}, {
  tableName: 'internship_deadline',
  timestamps: false,
});

// Define association
InternshipDeadline.belongsTo(Internship, { foreignKey: 'internship_id' });
Internship.hasMany(InternshipDeadline, { foreignKey: 'internship_id' });

export default InternshipDeadline;
