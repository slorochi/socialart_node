const express = require('express');
const router = express.Router();
const { Posts, Files, Users, Comments } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({
    include: [{ model: Files }, {
      model: Users, include: [
        {
          model: Files,
          as: "banner",
        },
        {
          model: Files,
          as: "profile_pic",
        },
      ],
    }]
  });
  res.status(200).json(listOfPosts);
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await Posts.findByPk(
    postId,{
    include:
      [
        { model: Files },
        {
          model: Comments, include: [
            {
              model: Users,
              include:
                [
                  {
                    model: Files,
                    as: "profile_pic",
                  },
                ]
            }]
        }, {
          model: Users, include: [
            {
              model: Files,
              as: "profile_pic",
            },
          ],
        }]
  });
  res.status(200).json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.status(200).json("create post");
});

router.put("/:id", async (req, res) => {
  const posts = req.body;
  const id = req.params;
  const post = await Posts.findByPk(id);
  await post.update(posts);
  res.status(200).json("post modified");

})

router.delete("/:id", async (req, res) => {
  const id = req.params;
  const postToDelete = await Posts.findByPk(id);
  await postToDelete.destroy();
  res.status(200).json("post to delete");
})


module.exports = router;