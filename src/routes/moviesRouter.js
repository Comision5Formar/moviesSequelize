const express = require('express');

const router = express.Router();

const {list, show, create, store, edit, update, remove, search} = require('../controllers/moviesController');

router.get('/listar/:offset?',list);
router.get('/detalle/:id',show);

router.get('/buscar',search);


router.get('/crear',create);
router.post('/crear',store);

router.get('/editar/:id',edit);
router.put('/editar/:id',update);

router.delete('/eliminar/:id',remove);

module.exports = router;