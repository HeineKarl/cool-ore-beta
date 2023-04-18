const { decrypt, verifyToken, parseJwt } = require("./tokenService");
const { destructureJWT } = require("./textService");

// Client Postgres
const client = require("./connectPostgres");

async function validation(req, res, next) {
  console.log("Validation Function".underline.magenta);
  try {
    const cookie = req.cookies.access;

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

    // Rumble JWT
    const secret = {
      jwtHeader: process.env.JWT_HEADER,
      jwtPayload: process.env.JWT_PAYLOAD,
      jwtSecret: process.env.JWT_SECRET,
    };
    const destructedJWT = destructureJWT(decryptedCookie, secret);

    const validCookie = await verifyToken(
      destructedJWT,
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log(validCookie, "VALID COOKIE");

    if (validCookie.expired) {
      console.log(`Expired: ${validCookie.expired}`.red);
      const { id } = parseJwt(destructedJWT);

      // await knexUser.updateData(id, {
      //   refreshToken: null,
      //   online: false,
      // });

      console.log(id, "COOKIE");

      // Assigning Refresh Token to the Database
      const updateQueryById = `UPDATE users
                         SET refresh_token = NULL
                         WHERE id = '${id}'
                        `;
      await client.query(updateQueryById);

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
