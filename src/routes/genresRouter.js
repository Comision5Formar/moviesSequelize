const express = require('express');

const router = express.Router();

const {list, show} = require('../controllers/genresController');

router.get('/listar',list);
router.get('/detalle/:id',show);


module.exports = router;