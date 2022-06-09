const jwt = require('jsonwebtoken');
import { TResult } from '../../DTO/TResult/TResult';
const tResult = new TResult();

const validateToken = (token) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const verified = jwt.verify(token, jwtSecretKey);
  if (verified) {
    return true;
  } else {
    return false;
  }
}


export default function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) {
    let result = tResult.CreateTResult<string>("", ["No se encontro el token"])
    return res.status(401).json(result);
  }
  token = token.replace("Bearer ", "");
  try {
    validateToken(token);
    next();
  } catch (error) {
    let result = tResult.CreateTResult<string>("", ["Token Invalido"])
    return res.status(401).json(result);
  }
}
