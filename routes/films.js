var express = require('express')
    , router = express.Router()

router.get('/', function(req, res) {
    res.send({film: 'Films app, available routes: /films, /films/[id]'})
});

router.use('/films', require('../controllers/films'))

module.exports = router;
