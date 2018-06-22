const mysql = require('../config/mysql.js');


module.exports = {
    hent_alle: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT farve_id, farve_navn 
                        FROM farver
                        ORDER BY farve_id ASC`,
                [], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    }
                    resolve(rows);
                });
            db.end();
        })
    }
}
