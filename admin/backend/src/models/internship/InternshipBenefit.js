import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';
import Internship from './Internship.js';

const InternshipBenefit = sequelize.define('InternshipBenefit', {
  internship_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Internship,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  benefit: DataTypes.TEXT,
}, {
  tableName: 'internship_benefit',
  timestamps: false,
});

// Define association
InternshipBenefit.belongsTo(Internship, { foreignKey: 'internship_id' });
Internship.hasMany(InternshipBenefit, { foreignKey: 'internship_id' });

export default InternshipBenefit;
