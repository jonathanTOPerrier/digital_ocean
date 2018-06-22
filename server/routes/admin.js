const path = require('path');
const admin_service = require(path.join(__dirname, '..', 'services', 'admin_service.js'));
const fisk_service = require(path.join(__dirname, '..', 'services', 'fisk_service.js'));
const farve_service = require(path.join(__dirname, '..', 'services', 'farve_service.js'));


module.exports = (app) => {

    app.get('/admin/fisk', (req, res) => {
        (async () => {
            try {
                let alle_farver = [];
                let alle_fisk = [];
                let en_fisk = {
                    "fisk_id": 0,
                    "fisk_navn": "",
                    "fisk_koen": "",
                    "farve_id": 0,
                    "farve_navn": ""
                };

                await farve_service.hent_alle()
                    .then(result => {
                        alle_farver = result;
                    })
                await fisk_service.hent_alle()
                    .then(result => {
                        alle_fisk = result;
                    })

                res.render('pages/fiske_admin', {
                    "title": "Mine Fisk",
                    "data": alle_fisk,
                    "formtype": "Opret",
                    "fisk": en_fisk,
                    "farver": alle_farver,
                    "page": "admin"
                });

            } catch (error) {
                console.log(error);
            }
        })();
    })

    app.post('/admin/fisk', (req, res) => {

        fisk_service.opret_en(req.body.navn, req.body.farve, req.body.koen)
            .then(result => {
                res.redirect("/admin/fisk");
            })
            .catch(err => {
                console.log(err);
            })

    })

    app.get('/admin/fisk/ret/:fisk_id', (req, res) => {

        (async () => {
            try {
                let alle_farver = [];
                let alle_fisk = [];
                let en_fisk = {
                    "fisk_id": 0,
                    "fisk_navn": "",
                    "fisk_koen": "",
                    "farve_id": 0,
                    "farve_navn": ""
                };

                await farve_service.hent_alle()
                    .then(result => {
                        alle_farver = result;
                    })
                await fisk_service.hent_alle()
                    .then(result => {
                        alle_fisk = result;
                    })
                await fisk_service.hent_en(req.params.fisk_id)
                    .then(result => {
                        en_fisk = result;
                    })

                res.render('pages/fiske_admin', {
                    "title": "Mine Fisk",
                    "data": alle_fisk,
                    "formtype": "Rediger",
                    "fisk": en_fisk,
                    "farver": alle_farver,
                    "page": "admin"
                });

            } catch (error) {
                console.log(error);
            }
        })();

    })

    app.post('/admin/fisk/ret/:fisk_id', (req, res) => {

        fisk_service.ret_en(req.body.navn, req.body.farve, req.body.koen, req.params.fisk_id)
            .then(result => {
                res.redirect("/admin/fisk");
            })
            .catch(err => {
                console.log(err);
                res.redirect("/admin/fisk");
            })

    })

    app.get('/admin/fisk/slet/:fisk_id', (req, res) => {

        fisk_service.slet_en(req.params.fisk_id).then(result => {
            res.redirect("/admin/fisk");
        })
            .catch(err => {
                console.log(err);
            })

    })

}