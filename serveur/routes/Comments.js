const express = require('express');
const router = express.Router();

router.get("/",async (req,res)=>{
    res.send("hi");
    const listOfComments = await Comments.findAll();
    res.status(200).json(listOfComments);
});

router.post("/", async(req,res)=>{
    const comments = req.body;
    await Comments.create(comments);
    res.status(200).json("create file");
});

//modify comment
router.put("/:id", async(req,res)=>{
    const comments= req.body;
    const id = req.params;
    const commentToModify = await Comments.findByPk(id);
    await commentToModify.update(comments);
    res.status(200).json("comment modified"); 

})

router.delete("/:id",async(req,res)=>{
    const id = req.params;
    const commentToDelete = await Comments.findByPk(id);
    await commentToDelete.destroy();
    res.status(200).json("comment to delete");
})


module.exports = router;