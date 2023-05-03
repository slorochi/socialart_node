module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments",{
        content:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
    })
    Comments.associate = (models) => {
        Comments.belongsTo(models.Users,{});
        Comments.belongsTo(models.Posts,{});
        Comments.belongsToMany(models.Users,{ through:'comments_liked'});

    }
    return Comments;
}