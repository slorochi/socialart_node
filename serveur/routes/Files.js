var express = require('express');
const { join } = require('path');
const dotenv = require("dotenv");
dotenv.config({ path: join(process.cwd(), '.env') });
const uploadLib = require('../utils/upload');
const fs = require("fs");
const router = express.Router();
// const cors = require('cors');
const mergeFiles = require('merge-files')
const multer = require('multer');
const { Files, Users } = require('../models');
const { getAudioDurationInSeconds } = require('get-audio-duration')


// Chemin pour upload/stockage des videos
const uploadPath = join(process.cwd(), 'uploads');
console.log("file output path:");
console.log(uploadPath);
//setup multer pour download les images
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        // retirer les espaces, cartères spéciaux et . pour l'extension
        const split = file.originalname.trim().split(/[\s/.^$*!:;,?§µù¤]+/);
        // récupère l'extension du fichier pour le retirer et le rajouter à la fin
        const extension = split[split.length - 1];
        split.pop();
        const merged = split.join('_');
        const name = `${merged}.${extension}`
        // avoir un nom unique basé sur la date
        cb(null, Date.now() + '-' + name);
    }
})

var upload = multer({ storage: storage })

// Endpoint pour l'upload de fichiers
router.post('/upload', upload.single('file'),async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }
    else{
    
    console.log(req.file);
    const file = req.file;

    // charger l'image en db
    const file_db = await Files.create({
        path: file.path,
        name: file.filename,
        type: file.mimetype,
/*         size: file.size,
 *//*         original_name: file.originalname
 */    }) 
    res.status(200).json(file_db);
    }
});



// Ajout des cors sur les routes /api/mp4
// router.use(cors());

// get files with given user mail 
router.get('/byUserEmail/:email', async (req, res) => {
    const emailUser = req.params.email;
    const user = await Users.findOne({ where: { email: emailUser } });
    console.log(user);
    const listOfFiles = await Files.findAll();
    res.json(listOfFiles);
});

// get files by mime_type
router.get('/byType/:type', async (req, res) => {
    const type = req.params.type;
    const files = await Files.findAll({
        where: {
            type: type
        }
    });
    res.json(files);

});


router.delete('/:id', async (req, res) => {
    const id_file = req.params.id;
    await Files.destroy({ where: { id: id_file } });
    refreshMediathequeUi();
    res.json("deleted with success");
})


module.exports = router;


















