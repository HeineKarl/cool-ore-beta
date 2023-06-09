function titleCase(string) {
  const sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(" ");
}

function splitText(string, split, val) {
  return string.split(split)[val];
}

function properCase(string) {
  const splitText = string.toLowerCase().split(" ");
  const text = splitText[0].charAt(0).toUpperCase() + splitText[0].substring(1);
  splitText.shift();

  const newArray = [text, ...splitText];

  // txt[0];
  // txt.join(" ");

  return newArray.join(" ");
}

function constructureJWT(token, secret) {
  if (typeof secret !== "object")
    return console.log(
      "Secret must be an object with jwtHeader, jwtPayload, jwtSecret as literals"
    );

  const { jwtHeader, jwtPayload, jwtSecret } = secret;

  const constHeader = token.split(".")[0];
  const constPayload = token.split(".")[1];
  const constSecret = token.split(".")[2];
  const posHeader = Math.floor(Math.random() * constHeader.length);
  const posPayload = Math.floor(Math.random() * constPayload.length);
  const posSecret = Math.floor(Math.random() * constSecret.length);
  const header = `${constHeader.slice(
    0,
    posHeader
  )}${jwtHeader}${constHeader.slice(posHeader)}`;
  const payload = `${constPayload.slice(
    0,
    posPayload
  )}${jwtPayload}${constPayload.slice(posPayload)}`;
  const classified = `${constSecret.slice(
    0,
    posSecret
  )}${jwtSecret}${constSecret.slice(posSecret)}`;
  const constructedJWT = [header, payload, classified].join(".");
  return constructedJWT;
}

function destructureJWT(token, secret) {
  if (typeof secret !== "object")
    return console.log(
      "Secret must be an object with jwtHeader, jwtPayload, jwtSecret as literals"
    );

  const { jwtHeader, jwtPayload, jwtSecret } = secret;

  const destHeader = token.split(".")[0];
  const destPayload = token.split(".")[1];
  const destSecret = token.split(".")[2];

  const header = destHeader.replace(jwtHeader, "");
  const payload = destPayload.replace(jwtPayload, "");
  const classified = destSecret.replace(jwtSecret, "");

  const destructedJWT = [header, payload, classified].join(".");
  return destructedJWT;
}

function constructureStr(str, secret) {
  const pos = Math.floor(Math.random() * str.length);
  return `${str.slice(0, pos)}${secret}${str.slice(pos)}`;
}

function destructureStr(str, secret) {
  return str.replace(secret, "");
}

function constructurePass(encrypted, secret) {
  if (typeof secret !== "object")
    return console.log(
      "Secret must be an object with jwtHeader, jwtPayload, jwtSecret as literals"
    );

  const { cryptRearLeft, cryptRearRight } = secret;

  let rearLeftPass = encrypted.slice(0, 20);
  let rearMidPass = encrypted.slice(20, encrypted.length - 20);
  let rearRightPass = encrypted.slice(encrypted.length - 20, encrypted.length);

  let finalPass = `${rearLeftPass}${cryptRearLeft}${rearMidPass}${cryptRearRight}${rearRightPass}`;
  return finalPass;
}

function destructurePass(decrypted, secret) {
  if (typeof secret !== "object")
    return console.log(
      "Secret must be an object with jwtHeader, jwtPayload, jwtSecret as literals"
    );

  const { cryptRearLeft, cryptRearRight } = secret;

  let rearLeftPass = decrypted.slice(0, 20 + cryptRearLeft.length);
  let rearMidPass = decrypted.slice(
    20 + cryptRearLeft.length,
    decrypted.length - (20 + cryptRearRight.length)
  );
  let rearRightPass = decrypted.slice(
    decrypted.length - (20 + cryptRearRight.length),
    decrypted.length
  );

  let decryptedLeft = rearLeftPass.replace(cryptRearLeft, "");
  let decryptedRight = rearRightPass.replace(cryptRearRight, "");

  let finalPass = `${decryptedLeft}${rearMidPass}${decryptedRight}`;

  return finalPass;
}

function countChar(str, letter) {
  let letterCount = 0;
  for (let position = 0; position < str.length; position++) {
    if (str.charAt(position) == letter) {
      letterCount += 1;
    }
  }
  return letterCount;
}

function popChar(string, count, searchVal) {
  let str = string;
  let i = 0;
  do {
    i++;
    str = str.replace(searchVal, "");
  } while (i < count);

  return str;
}

function sqlValidation(string) {
  let strBackTick = popChar(string, countChar(string, "`"), "`");
  let strSingleQuote = popChar(strBackTick, countChar(strBackTick, "'"), "'");
  let strDoubleQuote = popChar(
    strSingleQuote,
    countChar(strSingleQuote, '"'),
    '"'
  );
  let strPercent = popChar(strDoubleQuote, countChar(strDoubleQuote, "%"), "%");
  let final = strPercent;

  return final;
}

module.exports = {
  sqlValidation,
  popChar,
  countChar,
  properCase,
  titleCase,
  splitText,
  constructureStr,
  destructureStr,
  constructureJWT,
  destructureJWT,
  constructurePass,
  destructurePass,
};
