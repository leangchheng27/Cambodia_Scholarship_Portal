/**
 * UserFeedback Model
 * Stores every user interaction with a scholarship/internship.
 * These interaction records ARE the training data for the AI.
 *
 * How it trains the AI:
 *  - "save" / "apply" actions = strong positive signal (label 1.0)
 *  - "click" / "view"  actions = weak positive signal  (label 0.5)
 *  - "dismiss"         action  = negative signal        (label 0.0)
 *
 * The stored (userProfile, scholarshipId, label) triplets can be exported
 * and used with sentence-transformers to fine-tune the embedding model.
 */

import { DataTypes } from 'sequelize';
import sequelize from '../../db/database.js';

// Implicit signal strengths – used to compute the continuous training label
export const ACTION_SCORES = {
  view:    1,   // user saw it in list
  click:   2,   // user opened detail page
  save:    3,   // user bookmarked it
  apply:   5,   // user clicked "apply" – strongest positive signal
  dismiss: -2,  // user explicitly dismissed it – negative signal
};

const UserFeedback = sequelize.define('UserFeedback', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // null for anonymous/unauthenticated users
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  // The scholarship/internship identifier (DB integer id or static data string id)
  scholarshipId: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },

  scholarshipType: {
    type: DataTypes.ENUM('scholarship', 'internship', 'university'),
    defaultValue: 'scholarship',
  },

  // What the user did
  action: {
    type: DataTypes.ENUM('view', 'click', 'save', 'apply', 'dismiss'),
    allowNull: false,
  },

  // Pre-computed numeric signal strength from ACTION_SCORES
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  // Snapshot of the user profile at interaction time.
  // This is what gets paired with the scholarship text to form a training example.
  userProfile: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  // Optional: snapshot of the scholarship title/description for offline training
  scholarshipSnapshot: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'user_feedback',
  timestamps: true,   // createdAt / updatedAt
});

export default UserFeedback;
