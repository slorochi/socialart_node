module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        bio:{
            type:DataTypes.STRING(255),
            allowNull:true,

        }
        // # add bannner and pdp from user = here :)
    })
    Users.associate = (models) => {
        Users.hasMany(models.Files,{});
        Users.hasMany(models.Comments,{});
        Users.hasMany(models.Posts,{});
        Users.belongsToMany(models.Posts,{ through:'posts_liked'});
        Users.belongsToMany(models.Comments,{ through:'comments_liked'});

    }
    return Users;
}