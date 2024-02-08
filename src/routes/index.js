const { Router } = require('express');
const router = Router();

const { getCoords, getCoordById, CoordeUbic, createLProve } = require('../controllers/index.controller');


router.get('/cordenadas', getCoords);
router.get('/cordenadas/:id', getCoordById);
router.get('/consultar/', CoordeUbic);
router.post('/addProve', createLProve);

module.exports = router;