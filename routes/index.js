var express = require('express')
    , router = express.Router()

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function(req, res) {
    res.send({film: 'Films app, available routes: /films, /films/[id]'})
});

router.use('/films', require('../controllers/films'))

module.exports = router;
