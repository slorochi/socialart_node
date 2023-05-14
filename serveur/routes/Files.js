var express = require('express');
const { join } = require('path'); 
const dotenv = require("dotenv");
dotenv.config({ path: join(process.cwd(),'.env') });
const uploadLib = require('../utils/upload');
const fs = require("fs");
const router = express.Router();
// const cors = require('cors');
const mergeFiles = require('merge-files')
const multer  = require('multer');
const { Files, Users } = require('../models');
const { getAudioDurationInSeconds } = require('get-audio-duration')


// Chemin pour upload/stockage des videos
const uploadPath = join(process.cwd(),process.env.UPLOAD_PATH); 
const outputPath = join(uploadPath, 'userFiles');


const socket = require('../utils/socket').io().on('connection', (socket) => { 
    socket.on("askRefresh",function(data){
        Files.findAll()
            .then(res => {
                socket.emit('refreshMediathequeUi',res);
            });
    })
    return socket;
})

async function refreshMediathequeUi(){
    const listOfFiles = await Files.findAll();
    console.log('################## \n')
    console.log(listOfFiles);
    socket.emit('refreshMediathequeUi',listOfFiles);
}
// Settings Multer (parser multiform)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      cb(null, req.body.dzuuid + '-' + req.body.dzchunkindex)
    }
})
   
var upload = multer({ storage: storage })

// Ajout des cors sur les routes /api/mp4
// router.use(cors());

// upload multiple chunks
router.post('/upload-chunk', upload.single('file'), function (req,res){

    if(!(req.is('multipart/form-data'))){
        console.log("upload : invalid media type")
        res.status(415).json({message: "Unsupported Media Type",code: 415});
        return;
    }

    if(!req.file){ 
        return res.status(400).json({message: "Bad Request", code: 400})
    }
    // #todo: mettre le nom de l'utilisateur dans le dossier
    let chunkPath = uploadPath+"/"+req.file.filename

    // Taille maximum d'un chunk
    let uploadSizeMB = process.env.UPLOAD_SIZE;
    let maxUploadSize = uploadSizeMB * 1024 *1024;
    
    console.log(req.headers['content-length']);
    // Verification de la taille du chunk
    if(req.headers['content-length'] > maxUploadSize){
        console.log("upload : chunk size too big")

        res.status(413).json({message: `Chunk size exceeded (Maximum Size is ${uploadSizeMB} MB)`,code: 413});
        return;
    }
    if(fs.existsSync(chunkPath)){
        let stats = fs.statSync(chunkPath)
        // verify if chunk is not empty
        if(stats.size == 0){
            return res.status(400).json({
                code: 400120,
                extended_message: null,
                http_status_code: 400,
                message: "Le chunk est vide",
                more_info_url: null
            })
        }
        return res.status(201).end()
    }else{
        return res.status(400).json({
            code: 400110,
            extended_message: null,
            http_status_code: 400,
            message: "Nous n'avons pas pu télécharger le chunk.",
            more_info_url: null
        })
    }
    
})

// merge uploaded chunks avec les merged files dans la db
router.post('/merge-chunk', async function (req,res){
    // #todo: send user email split + pop... to create a folder of his unchangable name : email cannot be changed.
    let username = req.body.username;
    let inputPathList = []
    console.log(req.body.mime_type);
    let type = req.body.mime_type.split("/")[0];
    console.log(type);
    if (type==="audio"){
        return res.status(400).json({
            code: 400120,
            extended_message: "Vous venez d'essayer de télécharger un fichier mp3. Réessayer avec un mp4 ou un fichier image.",
            http_status_code: 400,
            message: "Les mp3 ne sont pas disponibles sur la plateforme.",
            more_info_url: null
        })                
    }
    // On stock l'extension et le nom du fichier pour pouvoir
    // incrementer en cas de fichier deja existant
    let filenameArray = req.body.filename.split(".");
    let extension = filenameArray.pop()
    let name = filenameArray.join('-')
    let filenameDef = req.body.filename;
    console.log(req.body);
    console.log(req.body.filename);
    for(var i=0 ; i < req.body.dztotalchunkcount ; i++){
        let chunk = `${uploadPath}/${req.body.dzuuid}-${i}`

        // vérifie si les chunk existent
        if(fs.existsSync(chunk)) {
            let stats = fs.statSync(chunk)
            // verifie si chunk pas vide
            if(stats.size != 0){
                inputPathList.push(chunk)
            }else{
                let chunckDelete = uploadLib.deleteChunks(req.body.dzuuid)
                let extended_message = null
                if(chunckDelete == false)
                    extended_message = "Il y'a eu une erreur dans la suppression des chunks"

                
                return res.status(400).json({
                    code: 400120,
                    extended_message: extended_message,
                    http_status_code: 400,
                    message: "Votre fichier est partiellement vide",
                    more_info_url: null
                })                
            }
        }else{
            let chunckDelete = uploadLib.deleteChunks(req.body.dzuuid)
            let extended_message = null
            if(chunckDelete == false)
                extended_message = "Il y'a eu une erreur dans la suppression des chunks"
            
            return res.status(400).json({
                code: 400115,
                extended_message: extended_message,
                http_status_code: 400,
                message: "Votre fichier a été perdu pendant le téléchargement",
                more_info_url: null
            })
        }    
    }
    
    // Renommage si le fichier existe (marche jusqua 99, rajoute -1 au dessus)
    if(fs.existsSync(`${outputPath}/${username}/${filenameDef}`)){
        let tempName = name;
        while(fs.existsSync(`${outputPath}/${username}/${tempName}.${extension}`)){
            const regex = /-[0-9]{1,2}$/g
            if(tempName.match(regex)){
                tempName = tempName.split("-")[0]+"-"+ (parseInt(tempName.split('-').pop())+1)
            }else{
                tempName = tempName + "-1"
            }
        }
        filenameDef = `${username}/${tempName}.${extension}`;
        name = tempName
    }
    
    let outputFile = `${outputPath}/${filenameDef}`;
    console.log(outputFile)
    mergeFiles(inputPathList,outputFile).then((status)=>{
        if(status){
            // final
            console.log(status);
            if(fs.existsSync(outputFile)){
                // Suppression des chunks
                let chunckDelete = uploadLib.deleteChunks(req.body.dzuuid);
                console.log(req.body);               
                // puis créer le fichier dans la db et refresh ui pour les users
                let file_db = {"path":join(process.env.UPLOAD_PATH, 'userFiles', username),"size":req.body.size,"type":type,"name":filenameDef,duration:null};
                let fileVideo =`${file_db.path}/${file_db.name}`;
                // récupère la durée du fichier si mp4 et le store en db
                if( file_db.type === 'video'){
                    getAudioDurationInSeconds(fileVideo).then((duration) => {
                        console.log(duration)
                        file_db.duration=duration
                      })
                }
                // ajoute le fichier en db
                Files.create(file_db).then((response)=>{
                    console.log(response)
                    return res.status(201).json({
                        "path": join(process.env.UPLOAD_PATH, 'final'),
                        "name": filenameDef,
                        "mime_type": req.body.mime_type,
                        "type": type,
                        "duration":file_db.duration
                        
                    });
                }).catch((err)=>{
                    console.log(err);
                });

                
            } else{
                return res.status(400).json({
                    code: 400,
                    extended_message: null,
                    http_status_code: 400,
                    message: "Le fichier final n'existe pas sur le serveur",
                    more_info_url: null
                })
            }

        }else{
            return res.status(400).json({
                code: 400,
                extended_message: null,
                http_status_code: 400,
                message: "Erreur lors du merge des chunks",
                more_info_url: null
            }) 
        }
    }) 

}) 

// get files with given user mail 
router.get('/byUserEmail/:email', async (req,res)=>{
    const emailUser = req.params.email;
    const user = await Users.findOne({where :{email:emailUser}});
    console.log(user);
    const listOfFiles = await Files.findAll();
    res.json(listOfFiles);
});

// get files by mime_type
router.get('/byType/:type', async (req, res)=>{
    const type = req.params.type;
    const files = await Files.findAll({
        where: {
          type: type
        }
      }); 
    res.json(files);    

});


router.delete('/:id', async(req,res)=>{
    const id_file =req.params.id;
    await Files.destroy({ where: {id:id_file} });
    refreshMediathequeUi();
    res.json("deleted with success");
})


module.exports = router;


















