const express = require('express');

const router = express.Router();

const {list, show, create, store, edit, update, remove, search} = require('../controllers/moviesController');

const moviesValidator = require('../validations/moviesValidator')

router.get('/listar/:offset?',list);
router.get('/detalle/:id',show);

router.get('/buscar',search);


router.get('/crear',create);
router.post('/crear',moviesValidator,store);

router.get('/editar/:id',edit);
router.put('/editar/:id',update);

router.delete('/eliminar/:id',remove);

module.exports = router;