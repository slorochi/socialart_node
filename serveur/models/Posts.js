module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts",{
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
        }
    })
    Posts.associate = (models) => {
        Posts.belongsTo(models.Users,{});
        Posts.belongsTo(models.Files,{});
        Posts.hasMany(models.Comments,{});
        Posts.belongsToMany(models.Users,{ through:'posts_liked'}); 
    }
    return Posts;
}