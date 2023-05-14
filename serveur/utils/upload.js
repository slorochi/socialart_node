const fs = require('fs')
const { join } = require('path'); 
const dotenv = require("dotenv").config({ path: join(process.cwd(),'.env') });
const tempPath = join(process.cwd(),process.env.UPLOAD_PATH); 

// Delete tous les chunks qui commencent par l'uuid en param
function deleteChunks(uuid) {
    let errors= [] 
    console.log("suppression des chunks en cours")
    // lecture de tous les fichiers contenus dans le dossier d'upload temporaire
    fs.readdir(tempPath, (err, files) => {
        if(err) errors.push(err);
        for(let file in files){
            if(files[file].includes(uuid)){
                fs.unlink(join(tempPath, files[file]), err => {
                    if(err) errors.push(err);
                })
            }
        } 
    })
    // Si il y a des erreurs lors de la suppression, renvoie false
    if(errors.length != 0){
        console.log(errors)
        return false
    }
    else
        return true
    }

exports.deleteChunks = deleteChunks
