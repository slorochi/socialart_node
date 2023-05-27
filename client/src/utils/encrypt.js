import CryptoJS from "crypto-js";
const SECRET_COOKIE_KEY = process.env.REACT_APP_SECRET_ENCRYPT_COOKIE_KEY; // clé de chiffrement
console.log(SECRET_COOKIE_KEY);
// Fonction de chiffrement
export function encrypt(data) {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_COOKIE_KEY
  ).toString();
  return ciphertext;
}

// Fonction de déchiffrement
export function decrypt(ciphertext) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, "poiazertyu19283746");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
