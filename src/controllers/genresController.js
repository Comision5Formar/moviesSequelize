const db = require("../database/models");

module.exports = {
    list : (req,res) => {

    },
    show : (req, res) => {
        db.Generos.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {
                    association : 'peliculas'
                }
            ]
        })
        .then(genero => {
            return res.render('moviesGenre',{
                genero
            })
        })
        .catch(error => res.send(error))
    }
}