const express = require('express');
const router = express.Router();

router.get("/",async (req,res)=>{
    res.send("hi");
    const listOfUsers = await Users.findAll();
    res.status(200).json(listOfUsers);
});

router.post("/", async(req,res)=>{
    const post = req.body;
    await Users.create(post);
    res.status(200).json("create file");
});

//modify comment
router.put("/:id", async(req,res)=>{
    const user= req.body;
    const id = req.params;
    const commentToModify = await Users.findByPk(id);
    await commentToModify.update(user);
    res.status(200).json("comment modified"); 

})

router.delete("/:id",async(req,res)=>{
    const id = req.params;
    const userToDelete = await Users.findByPk(id);
    await userToDelete.destroy();
    res.status(200).json("comment to delete");
})


module.exports = router;