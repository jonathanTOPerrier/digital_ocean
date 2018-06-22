const path = require('path');
const fisk_service = require(path.join(__dirname, '..', 'services', 'fisk_service.js'));


module.exports = (app) => {

    app.get('/', (req, res) => {
        fisk_service.hent_alle()
            .then(result => {
                res.render('pages/fisk', {
                    "title": "Mine Fisk",
                    "data": result
                });
            })
    })
    app.get('/fisk_enkelt/:id', (req, res) => {
        fisk_service.hent_en(req.params.id)
            .then(result => {
                res.render('pages/enkelt_fisk', {
                    "title": "En Fisk",
                    "data": result
                });
            })
    })


}