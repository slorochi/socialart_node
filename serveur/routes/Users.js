const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");


const JWT_SECRET_KEY = "poiazertyu19283746";
console.log(JWT_SECRET_KEY);
const { Users } = require("../models");

router.get("/",async (req,res)=>{
    res.send("hi");
    const listOfUsers = await Users.findAll();
    res.status(200).json(listOfUsers);
});

router.get('/setcookie', (req, res) => {
    res.cookie('remember', "the cookie set to remember user",{httpOnly: true, 
        sameSite: 'strict',
        maxAge: 3600 * 24 * 30}) // 30 days);
    res.send('Cookie have been saved successfully');
});

router.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});
// create user
router.post("/signup", async(req,res)=>{
    const post = req.body;
    await Users.create(post);
    res.status(200).json("create user");
});

// login user
router.post("/login", async(req,res)=>{
    const user = req.body;
    console.log(user);
    const userToLogin = await Users.findOne({where:{
        email:req.body.email,
        password:req.body.password
    }});
    console.log(userToLogin);
    if (userToLogin){
        const token = jwt.sign(userToLogin.toJSON(), JWT_SECRET_KEY, { expiresIn: "1h"});
        res.cookie(`Cookie_token_name`,{email:req.body.email, token:token});
        res.send('Cookie have been saved successfully');
    }
    else{
        res.status(401).json("No users found.")
    } 
});

//modify user infos
router.put("/:id", async(req,res)=>{
    const user= req.body;
    const id = req.params;
    const userToModify = await Users.findByPk(id);
    await userToModify.update(user);
    res.status(200).json("comment modified"); 

})

router.delete("/:id",async(req,res)=>{
    const id = req.params;
    const userToDelete = await Users.findByPk(id);
    await userToDelete.destroy();
    res.status(200).json("comment to delete");
})


module.exports = router;