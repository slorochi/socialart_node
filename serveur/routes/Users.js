const express = require("express");
const router = express.Router();
const hashLib = require("../utils/hash");
const jwt = require("jsonwebtoken");
const verifyLib = require("../utils/verifyToken");
const encryptLib = require("../utils/encrypt");


const JWT_SECRET_KEY = "poiazertyu19283746";
console.log(JWT_SECRET_KEY);

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET_KEY, {
        expiresIn: "24h",
    });
};


const { Users, Files, Posts } = require("../models");

/* get users */
router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.status(200).json(listOfUsers);
});

// get user by email
router.get("/byEmail/:mail", async (req, res) => {
    const email = req.params.mail;
    console.log(email);
    const userdb = await Users.findOne({
        where: { email: email },
        include: [
            {
              model: Files,
              as: "banner",
            },
            {
              model: Files,
              as: "profile_pic",
            },
            {
                model:Posts,
                include: [
                    {model:Files}
                ]
            }
          ],

        // include files pour sa profile pic
    });
    console.log(userdb);
    res.status(200).json(userdb);
})



router.get('/getcookie', (req, res) => {
    //send the saved cookies
    res.send(req.cookies.remember);

});
// create user
router.post("/signup", async (req, res) => {
    const userInfos = req.body;
    userInfos.username="username";
    console.log()
    let admin = true
    if(!userInfos.admin){
        admin = false;
    }
    userInfos.password = hashLib.hashPwd(userInfos.password);
    const u = await Users.create(({
        admin: admin,
        email: userInfos.email,
        password: userInfos.password,
        username:"roger"
    })
    );
    
    if (u) {
        // generate acces token
        const accessToken = generateAccessToken(u);
        const cookie = {
            email: u.email,
            accessToken: accessToken,
            admin: u.admin
        };
        console.log(cookie);
        // encrypted
        console.log("user is being finded");
        const encryptedText = encryptLib.encrypt(cookie);
        console.log(encryptedText);
        res.cookie("remember", encryptedText, {
            maxAge: 3600 * 24 * 30,
        }); // 30 days)
        res.status(200).json("user created successfully");
    }
    else {
        res.status(400).json("An error occured while creating user ");

    }

});

// login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    const hpwd = hashLib.hashPwd(password);
    const user = await Users.findOne({
        where: [{ email: email }, { password: hpwd }],
    });
    if (user) {
        // generate acces token
        const accessToken = generateAccessToken(user);
        const cookie = {
            email: email,
            accessToken: accessToken,
            admin: user.admin
        };
        // encrypted

        const encryptedText = encryptLib.encrypt(cookie);
        res.cookie("remember", encryptedText, {
            maxAge: 3600 * 24 * 30,
        }); // 30 days);
        res.status(200).json("user logged in successfully");

    } else {
        res.status(400).json("Username or password incorrect!");
    }
});


//modify user infos
router.put("/:id",  async (req, res) => {
    const user = req.body;
    console.log(user);
    const id = req.params.id;
    console.log(id);
    const userModify = await Users.update(user, {
        where: { id: id },
      });
    res.status(200).json("user modified");

})

router.delete("/:id",verifyLib.verify, async (req, res) => {
    const id = req.params;
    const userToDelete = await Users.findByPk(id);
    await userToDelete.destroy();
    res.status(200).json("user to delete");
})


module.exports = router;