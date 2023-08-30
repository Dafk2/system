const validateJwt = require('./validate_jwt_middleware');
const isAdminRoles = require('./validate_roles_middleware.js');
const validation = require('./validation_middleware');

module.exports = {
  ...validateJwt,
  ...isAdminRoles,
  ...validation
}

