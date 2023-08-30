const { check } = require('express-validator')

const { Router } = require('express');
const router = Router();

// controllers
const { validateJwt } = require('../middleware/validate_jwt_middleware');

// validations middleware
const { getCategory, postCategory, getCategoryId, putCategory, deleteCategory } = require('../controllers/category_controllers');
const { validationErrors } = require('../middleware/validation_middleware');

// helpers validations
const { idCategoryValidator } = require('../helpers/db_validators.');
const { isAdminRole } = require('../middleware/validate_roles_middleware');

// get category for id
router.get('/:id', [
  check('id', 'the id is required').isMongoId(),
  check('id').custom(idCategoryValidator),
  validationErrors
], getCategoryId)

// get categories
router.get('/', getCategory)

router.post('/' ,[
  validateJwt,
  check('name','The name is required').not().isEmpty(),
  validationErrors
], postCategory)

router.put('/:id', [
  validateJwt,
  check('name', 'The name is required').not().isEmpty(),
  check('id', 'The id is required').isMongoId(),
  check('id').custom(idCategoryValidator),
  validationErrors
], putCategory)

router.delete('/:id', [
  validateJwt,
  isAdminRole,
  check('id', 'the id is required').isMongoId(),
  check('id').custom(idCategoryValidator),
  validationErrors
], deleteCategory)

module.exports = router;