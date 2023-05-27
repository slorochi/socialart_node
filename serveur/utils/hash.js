const { createHash } = require("node:crypto");

function hashPwd(pwd) {
  return createHash("sha512").update(pwd).digest("hex");
}

exports.hashPwd = hashPwd;
