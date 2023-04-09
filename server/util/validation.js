const { decrypt, verifyToken, parseJwt } = require("./tokenService");

const knexService = require("./knexService");
const knexUser = new knexService("authorization");

async function validation(req, res, next) {
  console.log("Validation Function".underline.magenta);
  try {
    const cookie =
      req.cookies.access ||
      "40a1676d8fb8ee16c7c30796d606358acf24e2d2a6d733a34823154c19e7d775c191c3575289f98618f4d59a0c4e67d9098f2a4976f3ce22f2cffdee63d59287e9fc22ca2a52f927e73c69b32f99fa16d4310555d2b6811ecb4539cd05e81dd8b277c3ac45f0cf1eb3fedd004de367ef9af4d7d336d47c54cc9d617d32338daf23eb765675660e863ac6ae0b9c921acff7664456a182728125cb3d43ad08621318f68014d26ad73606512e117e523cc2e9bdf6f94187bad76f38093055d566a0a8c0f3b518b2fdc141c61e9bf194d792444686a75b168368cff64a0c1c987ef34e7de12897f41e4da3";

    if (cookie == undefined) {
      console.log(`Cookie is ${cookie}`.red);
      return res.status(401).json({
        message: "Unauthorized",
        report: "Cookie is undefined",
        ok: false,
      });
    }

    const decryptedCookie = await decrypt(cookie);

    if (decryptedCookie.invalid) {
      console.log(`Invalid Decrypted Cookie: ${decryptedCookie.invalid}`.red);
      return res.status(401).json({
        message: decryptedCookie.message,
        report: decryptedCookie.report,
        ok: decryptedCookie.ok,
        invalid: decryptedCookie.invalid,
      });
    }

    const validCookie = await verifyToken(
      decryptedCookie,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (validCookie.expired) {
      console.log(`Expired: ${validCookie.expired}`.red);
      const { id } = parseJwt(decryptedCookie);

      await knexUser.updateData(id, {
        refreshToken: null,
        online: false,
      });

      return res.clearCookie("access").status(401).json({
        message: validCookie.message,
        report: validCookie.report,
        ok: false,
        expired: validCookie.expired,
      });
    }

    if (validCookie.invalid) {
      console.log(`Invalid Cookie: ${validCookie.invalid}`.red);
      return res.status(401).json({
        message: validCookie.message,
        report: validCookie.report,
        ok: validCookie.ok,
        invalid: validCookie.invalid,
      });
    }

    req.cookieToken = validCookie;
    next();
  } catch (err) {
    console.log(Object.keys(err));
    console.log(err);
    console.log(err?.message);
  }
}

module.exports = validation;
