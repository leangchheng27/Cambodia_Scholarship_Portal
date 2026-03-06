// Utility functions
const hashPassword = (password) => {
  // TODO: Use bcrypt for hashing
  // const bcrypt = require('bcrypt');
  // return bcrypt.hashSync(password, 10);
  return password; // Placeholder
};

const comparePassword = (password, hash) => {
  // TODO: Use bcrypt for comparison
  // const bcrypt = require('bcrypt');
  // return bcrypt.compareSync(password, hash);
  return password === hash; // Placeholder
};

const formatResponse = (success, data = null, message = '') => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  hashPassword,
  comparePassword,
  formatResponse,
};
