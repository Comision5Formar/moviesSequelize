const db = require("../database/models");
const { Op} = require("sequelize");

const moment = require("moment");
moment.locale("es");

module.exports = {
    list: (req, res) => {
        let offset = +req.params.offset || 0;

        db.Peliculas.findAll()
            .then((peliculas) => {
                return res.render("moviesList", {
                    peliculas,
                });
            })
            .catch((error) => res.send(error));
    },
    show: (req, res) => {
        db.Peliculas.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    association: 'genero'
                },
                {
                    association: 'actores'
                }
            ]
        })
            .then((pelicula) => {
                return res.render("movieDetail", {
                    pelicula,
                    fecha: moment(pelicula.release_date).format("d MMMM YYYY"),
                });
            })
            .catch((error) => res.send(error));
    },
    create: (req, res) => {
        db.Generos.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
            .then(generos => {
                return res.render("moviesAdd", {
                    generos
                });
            })
            .catch(error => res.send(error))
    },
    store: (req, res) => {
        const { title, rating, awards, release_date, length, genre_id } = req.body;

        db.Peliculas.create({
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id
        })
            .then((newPeli) => {
                console.log(newPeli);
                res.redirect("/peliculas/listar");
            })
            .catch((error) => res.send(error));
    },
    edit: (req, res) => {
        let pelicula = db.Peliculas.findByPk(req.params.id);
        let generos = db.Generos.findAll()
        Promise.all([pelicula, generos])
            .then(([pelicula, generos]) => {
                res.render("moviesEdit", {
                    pelicula,
                    estreno: moment(pelicula.release_date).format('YYYY-MM-DD'),
                    generos
                });
            })
            .catch(error => res.send(error))
    },
    update: (req, res) => {

        const { title, rating, awards, release_date, length, genre_id } = req.body;

        db.Peliculas.update({
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                console.log(result)
                return res.redirect('/peliculas/detalle/' + req.params.id)
            })
            .catch(error => res.send(error))

    },
    remove: (req, res) => {
        db.Peliculas.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                console.log('La pelicula ha sido eliminada')
                return res.redirect('/peliculas/listar')
            })
            .catch(error => res.send(error))
    },
    search: (req, res) => {
        db.Peliculas.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.buscar}%`,
                },
            },
        })
            .then((peliculas) => {
                return res.render("moviesResult", {
                    peliculas,
                });
            })
            .catch((error) => res.send(error));
    },
};
