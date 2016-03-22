var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/test1');
var db = mongoose.connection;

db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

var Film = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    modified: { type: Date, default: Date.now },
    related: [{ type: Schema.Types.ObjectId, ref: 'Film' }]
});

var FilmModel = mongoose.model('Film', Film);

module.exports.FilmModel = FilmModel;