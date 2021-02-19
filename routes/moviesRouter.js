const express = require('express');

const router = express.Router();

const {list, show, create, store, edit, update, remove, search} = require('../controllers/moviesController');

router.get('/listar/:offset?',list);
router.get('/detalle/:id',show);

router.get('/buscar',search);


module.exports = router;