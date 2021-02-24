module.exports = (sequelize, dataTypes) => {

    const alias = "Actores";

    const cols = {
        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey :true
        },
        first_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        last_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1)
        },
       
        favorite_movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
        },
        country : {
            type : dataTypes.STRING(255),
        }
    }

    const config = {
        tableName : "actors",
        timestamps : true, //si no existen con mayor debemos señalar false
        underscored: true
    }

    const Actor = sequelize.define(alias,cols,config);

    Actor.associate = function(models){
        Actor.belongsToMany(models.Peliculas,{
            as : 'peliculas',
            through : 'actor_movie',
            foreignKey : 'actor_id',
            otherKey : 'movie_id'
        })

        Actor.belongsTo(models.Peliculas,{
            as : 'favorita',
            foreignKey : 'favorite_movie_id'
        })
    }

    return Actor;
    
}