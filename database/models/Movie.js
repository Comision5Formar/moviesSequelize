module.exports = (sequelize, dataTypes) => {

    const alias = "Peliculas";

    const cols = {
        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey :true
        },
        title : {
            type : dataTypes.STRING(500),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false
        },
        awards : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false,
            defaultValue: 0,
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false
        },
        length : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        },
        genre_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        }
    }

    const config = {
        tableName : "movies",
        timestamps : true, //si no existen con mayor debemos señalar false
        underscored: true
    }

    const Movie = sequelize.define(alias,cols,config);

    return Movie;
    
}