const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");


const JWT_SECRET_KEY = "poiazertyu19283746";
console.log(JWT_SECRET_KEY);
const { Users, Files } = require("../models");

router.get("/",async (req,res)=>{
    const listOfUsers = await Users.findAll();
    res.status(200).json(listOfUsers);
});

// get user by email
router.get("/byEmail/:mail",async(req,res)=>{
    const email = req.params.mail;
    console.log(email);
    const userdb = await Users.findOne({
        where: {email:email},
        attributes:["email","username","bio"],
        include: Files
        // include files pour sa profile pic
    });
    res.status(200).json(userdb);
})


router.get('/setcookie', (req, res) => {
    res.cookie('remember', "the cookie set to remember user",{httpOnly: true, 
        sameSite: 'strict',
        maxAge: 3600 * 24 * 30}) // 30 days);
    res.send('Cookie have been saved successfully');
});

router.get('/getcookie', (req, res) => {
    //send the saved cookies
    res.send(req.cookies.remember);
    
});
// create user
router.post("/signup", async(req,res)=>{
    const post = req.body;
    const u = await Users.create(post);
    // #todo : or find one here
    const token = jwt.sign(u.toJSON(), JWT_SECRET_KEY, { expiresIn: "1h"});
        res.cookie('remember', {email:req.body.email, token:token},{httpOnly: true, 
            sameSite: 'strict',
            maxAge: 3600 * 24 * 30}) // 30 days);
        res.status(200).json('Cookie have been saved successfully');
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
        res.cookie('remember', {email:req.body.email, token:token},{httpOnly: true, 
            sameSite: 'strict',
            maxAge: 3600 * 24 * 30}) // 30 days);
        res.status(200).json('Cookie have been saved successfully');
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