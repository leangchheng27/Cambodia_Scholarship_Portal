import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Internship from './Internship.js';

const InternshipFieldOfStudy = sequelize.define('InternshipFieldOfStudy', {
  internship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Internship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  field_name: DataTypes.STRING,
}, {
  tableName: 'internship_field_of_study',
  timestamps: false,
});

// Define association
InternshipFieldOfStudy.belongsTo(Internship, { foreignKey: 'internship_id' });
Internship.hasMany(InternshipFieldOfStudy, { foreignKey: 'internship_id' });

export default InternshipFieldOfStudy;
