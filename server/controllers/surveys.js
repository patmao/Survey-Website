let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// create a reference to the model
let Surveys = require('../models/surveys');

module.exports.displayBusinessContactsList = (req, res, next) => {
    Surveys.find((err, surveysList) => {
        if (err) {
            return console.error(err);
        }
        else {


            res.render('surveys/list',
                {
                    title: 'Surveys',
                    surveysList: surveysList,
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    }).sort({ 'contact_name': 1 });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('surveys/add', {
        title: 'Add Surveys',
        displayName: req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Surveys({
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email,
    });

    Surveys.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/surveys');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Surveys.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('surveys/edit', {
                title: 'Edit Answer', survey: surveyToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurveys = Surveys({
        "_id": id,
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email,
    });

    Surveys.updateOne({ _id: id }, updatedSurveys, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/surveys');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Surveys.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/surveys');
        }
    });
}