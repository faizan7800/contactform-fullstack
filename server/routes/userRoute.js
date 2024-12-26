const { getAllForms, contactFormHandler } = require('../controllers/UserController');

const router = require('express').Router();

router.post("/form-data", contactFormHandler);


router.get("/form-data", getAllForms);

module.exports = router;