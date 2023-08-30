const { Router } = require('express');
const router = Router();

// controllers
const { searchCollections } = require('../controllers/search_controllers')

router.get('/:collection/:desc', searchCollections)

module.exports = router;