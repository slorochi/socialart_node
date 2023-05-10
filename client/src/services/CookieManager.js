// #todo créer les fonctions pour checker les cookies: si cookie, set AuthContext à un objet avec les infos du cookie / par rapport à la clé secrète
import axios from "axios";
export function checkIfAuthenticated(){
    axios.get("https://localhost:3001/users/getcookie").then((resp)=>{
        console.log(resp);
    })
}
export function AuthenticateUser(valuesToSet){
    axios.post("https://localhost:3001/users/setcookie",valuesToSet);
}