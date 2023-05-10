const express = require('express');
const router = express.Router();
const { Posts } = require("../models");

router.get("/",async (req,res)=>{
    const listOfPosts = await Posts.findAll();
    res.status(200).json(listOfPosts);
});

router.post("/", async(req,res)=>{
    const post = req.body;
    await Posts.create(post);
    res.status(200).json("create file");
});

router.put("/:id", async(req,res)=>{
    const posts= req.body;
    const id = req.params;
    const commentToModify = await Posts.findByPk(id);
    await commentToModify.update(posts);
    res.status(200).json("comment modified"); 

})

router.delete("/:id",async(req,res)=>{
    const id = req.params;
    const postToDelete = await Posts.findByPk(id);
    await postToDelete.destroy();
    res.status(200).json("comment to delete");
})


module.exports = router;