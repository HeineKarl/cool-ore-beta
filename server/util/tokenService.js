const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
const { properCase } = require("./textService");

class tokenService {
  static encrypt(token) {
    console.log("Encrypt Function".cyan);

    if (token === null || token === undefined)
      return console.log(`Token is ${token}`);

    if (typeof token !== "string")
      return console.log(`${token} is not a string`);

    return new Promise(async (resolve, reject) => {
      try {
        const encryptedToken = cryptr.encrypt(token);
        resolve(encryptedToken);
      } catch (err) {
        console.log(`${err} in encrypt`);
        reject(err);
      }
    });
  }

  static decrypt(token) {
    console.log("Decrypt Function".cyan);

    if (token === null || token === undefined)
      return console.log(`Token is ${token}`);

    if (typeof token !== "string")
      return console.log(`${token} is not a string`);

    return new Promise(async (resolve, reject) => {
      try {
        const decryptToken = cryptr.decrypt(token);
        resolve(decryptToken);
      } catch (err) {
        if (err.message == "Unsupported state or unable to authenticate data") {
          return resolve({
            message: "Forbidden",
            report: properCase(err.message),
            ok: false,
            invalid: true,
          });
        }

        if (err.message == "Invalid IV length") {
          return resolve({
            message: "Forbidden",
            report: properCase(err.message),
            ok: false,
            invalid: true,
          });
        }
        console.log(`${err} in decrypt`);
        reject(err);
      }
    });
  }

  static generateAccessToken(user) {
    console.log("Generate Access Token Function".cyan);

    if (user == null || user == undefined)
      return console.log(`User is ${user}`);

    if (typeof user !== "object")
      return console.log(`Value ${user} is not an object`);

    return new Promise(async (resolve, reject) => {
      try {
        const options = { expiresIn: process.env.EXPIRATION_TIME };
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, options);
        resolve(token);
      } catch (err) {
        console.log(`${err} in generateAccessToken`);
        reject(err);
      }
    });
  }

  static generateRefreshToken(user) {
    console.log("Generate Refresh Token Function".cyan);

    if (user == null || user == undefined)
      return console.log(`User is ${user}`);

    if (typeof user !== "object")
      return console.log(`Value ${user} is not an object`);

    return new Promise(async (resolve, reject) => {
      try {
        const options = {};
        const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, options);
        resolve(token);
      } catch (err) {
        console.log(`Error ${err} in generateRefreshToken`);
        reject(err);
      }
    });
  }

  static generateSecretkey(secretkey) {
    console.log("Generate Secretkey Function".cyan);

    if (secretkey == null || secretkey == undefined)
      return console.log(`Secretkey is ${secretkey}`);

    if (typeof secretkey !== "string")
      return console.log(`${secretkey} is not a string`);

    return new Promise(async (resolve, reject) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const secret = await bcrypt.hash(secretkey, salt);
        resolve(secret);
      } catch (err) {
        console.log(`Error ${err} in generateSecretkey`);
        reject(err);
      }
    });
  }

  static verifySecretkey(secretkey) {
    console.log("Verify Secretkey Function".cyan);

    if (secretkey == null || secretkey == undefined)
      return console.log(`Secretkey is ${secretkey}`);

    return new Promise(async (resolve, reject) => {
      try {
        const secret = await bcrypt.compare(process.env.SECRET_KEY, secretkey);
        resolve(secret);
      } catch (err) {
        console.log(`Error ${err} in verifySecretkey`);
        reject(err);
      }
    });
  }

  static verifyToken(token, secret) {
    console.log("Verify Token Function".cyan);

    if (token == null || token == undefined)
      return console.log(`Token is ${token}`);

    if (secret == null || secret == undefined)
      return console.log(`Secret is ${secret}`);

    return new Promise(async (resolve, reject) => {
      try {
        const validToken = jwt.verify(token, secret);
        resolve(validToken);
      } catch (err) {
        if (err.message == "invalid signature")
          resolve({
            message: "Unathorized",
            report: properCase(err.message),
            ok: false,
            invalid: true,
          });

        if (err.message == "jwt must be provided")
          resolve({
            message: "Unauthorized",
            report: properCase(err.message),
            ok: false,
            invalid: true,
          });

        if (err.message == "jwt expired")
          resolve({
            message: "Session Expired",
            report: properCase(err.message),
            ok: false,
            expired: true,
          });

        if (err.message == "jwt malformed")
          resolve({
            message: "Unauthorized",
            report: properCase(err.message),
            ok: false,
            invalid: true,
          });

        if (err.message == "jwt must be a string")
          resolve({
            message: "Forbidden",
            report: properCase(err.message),
            ok: false,
            invalid: true,
          });

        console.log(`${err} in verifyToken`);
        reject(err);
      }
    });
  }

  static parseJwt(token) {
    console.log("ParseJWT".cyan);
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
}

module.exports = tokenService;
