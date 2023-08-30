const { Router } = require('express')
const { check } = require('express-validator');

// controllers
const { authPost, renewToken, googleSingIng } = require('../controllers/auth_controllers');
const { validateJwt } = require('../middleware/validate_jwt_middleware');

// helpers validations
const { validationErrors } = require('../middleware/validation_middleware');

const router = Router();

router.post('/login', [
  check('email', 'Invalid Email').isEmail(),
  check('password', 'The password must have a minimun of 7 characters').isLength({ min: 7 }),
  validationErrors
], authPost)

router.post('/google', [
  check('id_token', 'The token is required').not().isEmpty(),
  validationErrors
], googleSingIng)

router.get('/', validateJwt, renewToken)

module.exports = router;