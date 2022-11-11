let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let passport = require('passport');

let businessContactsController = require('../controllers/business_contacts');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ Operation */
router.get('/', requireAuth, businessContactsController.displayBusinessContactsList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, businessContactsController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, businessContactsController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, businessContactsController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, businessContactsController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, businessContactsController.performDelete);

module.exports = router;