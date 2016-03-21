var express = require('express')
    , router = express.Router()
    , FilmModel = require('../models/film').FilmModel;

router.post('/u:id', function(req, res) {
    return FilmModel.findById(req.params.id, function (err, film) {
        console.log(film);
        if (!film) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }

        if (req.body.title)
            film.title = req.body.title;
        if (req.body.description)
            film.description = req.body.description;
        if (req.body.images)
            film.images = film.images.extend(req.body.images);

        return film.save(function (err) {
            if (!err) {
                return res.send({ status: 'OK', film:film });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });

    });
});

router.post('/add', function(req, res) {
    var film = new FilmModel({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images
    });

    film.save(function (err) {
        if (!err) {
            res.send({ status: 'OK', film:film });
        } else {
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

router.get('/:id', function(req, res) {
    return FilmModel.findById(req.params.id, function (err, film) {
        return res.send({film: film})
    })
});

router.get('/', function(req, res) {
    return FilmModel.find({}, function(err, films) {
        return res.send({films: films})
    })
});

module.exports = router;
