module.exports = (sequelize, DataTypes) => {
    const Files = sequelize.define("Files",{
        path:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    })
    Files.associate = (models) => {
        Files.belongsTo(models.Users,{});
        Files.belongsToMany(models.Posts,{ through:'CommentsLiked'});

    }
    return Files;
}