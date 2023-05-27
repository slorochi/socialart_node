const SECRET_KEY = "poiazertyu19283746";
const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  // get the bearer token
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // token = without bearer
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res
      .status(401)
      .json(
        "Vous n'êtes pas authentifié! Ajoutez le bearer token pour vous authentifier"
      );
  }
}

exports.verify = verify;
