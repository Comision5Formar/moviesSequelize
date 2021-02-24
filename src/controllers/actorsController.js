const db = require("../database/models");

module.exports = {
    list : (req,res) => {

    },
    show : (req, res) => {
        db.Actores.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {
                    association : 'peliculas'
                },
                {
                    association : 'favorita'
                }
            ]
        })
        .then(actor => {
            return res.render('moviesActor',{
                actor
            })
        })
        .catch(error => res.send(error))
    }
}