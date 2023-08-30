const { check } = require('express-validator')

const { Router } = require('express');
const router = Router();

// controllers
const { getUserId, getUsers, postUser, putUser, deleteUser } = require('../controllers/user_controllers');

// validations middleware
const { validationErrors } = require('../middleware/validation_middleware');
const { validateJwt } = require('../middleware/validate_jwt_middleware');
const { isAdminRole } = require('../middleware/validate_roles_middleware');

// helpers validations
const { validationEmail, validationId, validationRole } = require('../helpers/db_validators.');

// get user for id
router.get('/:id', getUserId)

// get users
router.get('/', [
  check('limit', 'The limit has to be a number').isNumeric(),
  check('skips', 'The skips has to be a number').isNumeric(),
  validationErrors
], getUsers)

router.post('/' , [
  check('email', 'The email is required check').isEmail(), 
  check('email').custom(validationEmail),
  check('name', 'The name is required check').not().isEmpty(), 
  check('password', 'The password is required check').isLength({ min: 7 }), 
  check('role').custom(validationRole),
  validationErrors
], postUser)

router.put('/:id', [
  check('id', 'It is not a valid id').isMongoId(),
  check('id').custom(validationId),
  check('email', 'The email is required').isEmail(),
  check('email').custom(validationEmail),
  check('password', 'The new password is required and must have a minimun of 7 characters').isLength({ min: 7 }),
  check('name', 'The name is required').not().isEmpty(), 
  validationErrors
], putUser)

router.delete('/:id', [
  validateJwt,
  isAdminRole,
  check('id', 'It is not a valid id').isMongoId(),
  check('id').custom(validationId),
  validationErrors
], deleteUser)

module.exports = router;

// Recordar aprender los codigos de estado