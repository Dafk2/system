const { Router } = require('express')
const { check } = require('express-validator');

// controllers
const { productGet, getProductId, productPost, productPut, productDelete } = require('../controllers/product_controllers');

// middlewares
const { validateJwt, validationErrors, isAdminRole } = require('../middleware/index')

// helpers
const { validationName, idCategoryValidator, idProductValidator } = require('../helpers/db_validators.')


const router = Router();

// routes
router.get('/',  productGet )

// get product for id
router.get('/:id', [
  check('id','The product id invalid').isMongoId(),
  check('id').custom(idProductValidator),
  validationErrors
],getProductId)

router.post('/', [
 validateJwt,
 check('name', 'The name is required').not().notEmpty(),
 check('name').custom(validationName),
 check('price', 'The price is required').not().isEmpty(),
 check('price', 'The price has to be a number').isNumeric(),
 check('category', 'The category id invalid').isMongoId(),
 check('category',).custom(idCategoryValidator),
 validationErrors
], productPost)

router.put('/:id', [
  validateJwt,
  check('name', 'The name is required').not().isEmpty(),
  check('id', 'The product id invalid').isMongoId(),
  check('id').custom(idProductValidator),
  check('name').custom(validationName),
  validationErrors
], productPut)

router.delete('/:id', [
  validateJwt,
  isAdminRole,
  check('id','The id is required').isMongoId(),
  check('id').custom(idProductValidator),
  validationErrors
], productDelete)

module.exports = router;