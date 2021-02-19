const db = require('../database/models');
const {Op}= require('sequelize');

const moment = require('moment');
moment.locale('es');

module.exports = {
    list : (req,res) => {

        let offset = +req.params.offset || 0;

        db.Peliculas.findAll({
            order : [
                ['title', 'ASC']
            ],
            limit : 5,
            offset : offset
        })
        .then(peliculas => {
            return res.render('moviesList',{
                peliculas,
                offset : offset + 5
            })
        })
        .catch(error => res.send(error))
    },
    show : (req,res) => {
        db.Peliculas.findByPk(req.params.id)
        .then(pelicula => {
            return res.render('movieDetail',{
                pelicula,
                fecha: moment(pelicula.release_date).format("d MMMM YYYY")
            })
        })
        .catch(error => res.send(error))

    },
    create : (req,res) => {

    },
    store : (req,res) => {

    },
    edit : (req,res) => {

    },
    update : (req,res) => {

    },
    remove : (req,res) => {

    },
    search : (req,res) => {
        db.Peliculas.findAll({
            where : {
                title : {
                    [Op.like] : `%${req.query.buscar}%`
                }
            }
        })
        .then(peliculas => {
            return res.render('moviesResult',{
                peliculas
            })
        })
        .catch(error => res.send(error))
    }
}