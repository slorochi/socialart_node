var CryptoJS = require("crypto-js");

const SECRET_COOKIE_KEY = process.env.SECRET_ENCRYPT_COOKIE_KEY; // clé de chiffrement

// Fonction de chiffrement
function encrypt(data) {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_COOKIE_KEY
  ).toString();
  return ciphertext;
}

// Fonction de déchiffrement
function decrypt(ciphertext) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_COOKIE_KEY);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

module.exports = { encrypt, decrypt };
