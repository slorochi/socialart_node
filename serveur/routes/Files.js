const express = require('express');
const router = express.Router();
const { Files } = require("../models");

router.get("/",async (req,res)=>{
    res.send("hi");
    const listOfFiles = await Files.findAll();
    res.status(200).json(listOfFiles);
});

router.post("/", async(req,res)=>{
    const files = req.body;
    await Files.create(files);
    res.status(200).json("create file");
});

//modify comment
router.put("/:id", async(req,res)=>{
    const files= req.body;
    const id = req.params;
    const filesModified = await Files.findByPk(id);
    await filesModified.update(files);
    res.status(200).json("comment modified"); 

})

router.delete("/:id",async(req,res)=>{
    const id = req.params;
    const fileToDelete = await Files.findByPk(id);
    await fileToDelete.destroy();
    res.status(200).json("comment to delete");
})


module.exports = router;