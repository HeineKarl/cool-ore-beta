// Imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Create Object
const insertion = require("../../util/postgresService");

// Client Postgres
const client = require("../../util/connectPostgres");

client.connect((err) => {
  if (err) {
    console.log("Something is wrong with the DB Connection" + err);
    throw err;
  }
  console.log("PG Connected");
});

// Importing Services
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  encrypt,
  decrypt,
} = require("../../util/tokenService");

const { refreshTime, nextWeek } = require("../../util/timeService");

// Validation
const validation = require("../../util/validation");
const {
  properCase,
  constructureStr,
  destructureStr,
  constructureJWT,
  destructureJWT,
} = require("../../util/textService");

// Getting all users
router.get("/all", async (req, res) => {
  try {
    console.log("Get All Users".underline.green);

    const getQuery = `SELECT * FROM users`;

    client.query(getQuery, (err, result) => {
      if (!err)
        return res.status(200).json({
          data: result.rows,
          msg: "Get All Users Successfully",
          ok: true,
        });

      res.status(500).json({
        error: err,
        msg: err.message,
        ok: false,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

// Geetting Active Users
router.get("/", async (req, res) => {
  try {
    console.log("Get Active Users".underline.green);

    const getQuery = `SELECT * FROM users WHERE deleted_at IS NULL`;

    client.query(getQuery, (err, result) => {
      if (!err)
        return res.status(200).json({
          data: result.rows,
          msg: "Get Active Users Successfully",
          ok: true,
        });

      res.status(500).json({
        error: err,
        msg: err.message,
        ok: false,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

// Getting Specific User
router.get("/:id", async (req, res) => {
  try {
    console.log("Get Single User".underline.green);

    const { id } = req.params;
    const getQuery = `SELECT * FROM users WHERE id = ${id}`;

    client.query(getQuery, (err, result) => {
      if (!err)
        return res.status(200).json({
          data: result.rows,
          msg: "Get Single User Successfully",
          ok: true,
        });

      res.status(500).json({
        error: err,
        msg: err.message,
        ok: false,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

// Register User
router.post("/register", async (req, res) => {
  console.log("Register Route".underline.green);
  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.passcode, salt);

    // Creating user
    const { user_name, email } = req.body;
    const created_at = new Date().toISOString().split("T")[0];

    // Inserting User in the Database
    const insertQuery = `WITH new_user as (
                         INSERT INTO users (user_name, email, passcode, created_at)
                         VALUES (${insertion(user_name)}, 
                                 ${insertion(email)}, 
                                 ${insertion(hashedPassword)}, 
                                 ${insertion(created_at)})
                         returning id
                         )
                         INSERT INTO audio (user_id)
                         VALUES ((SELECT id FROM new_user));`;

    await client.query(insertQuery);

    res.json({ msg: "Successfully Registered", ok: true });
  } catch (err) {
    console.log(`${err}`.red);

    if (err.constraint == "users_email_key")
      return res
        .status(409)
        .json({ err: err.message, msg: "Email is already used", ok: false });

    // If server crashed or bad request
    res.status(500).json({ message: "There is a bad request", ok: false });
    console.error(`Error at Post Request --> ${err}`);
  }
});

// Login User
router.post("/login", async (req, res) => {
  console.log("Login Route".underline.green);
  try {
    // Verify Data
    // const data = await knexUser.verifyData("email", req.body.email);

    const getQuery = `SELECT * 
                      FROM users 
                      WHERE email = '${req.body.email}' 
                      AND deleted_at IS NULL`;

    // Checking for Invalid User and Get the Data
    const data = await client.query(getQuery);

    // Invalid User
    if (data.rows.length == 0)
      return res.status(401).json({
        msg: "Invalid User or No User",
        ok: false,
      });

    // Compare the Password
    const verified = await bcrypt.compare(
      req.body.passcode,
      data.rows[0].passcode
    );

    // If not verified
    if (!verified)
      return res
        .status(401)
        .json({ message: "Invalid Credentials", ok: false });

    // Get different attributes
    const { id, user_name, email, profile_image } = data.rows[0];

    // Generate Access Token and Refresh Token
    const accessToken = await generateAccessToken({ id });
    const refreshToken = await generateRefreshToken({ id });

    // Rumble JWT
    const secret = {
      jwtHeader: process.env.JWT_HEADER,
      jwtPayload: process.env.JWT_PAYLOAD,
      jwtSecret: process.env.JWT_SECRET,
    };
    const constructedJWTAccess = constructureJWT(accessToken, secret);
    const constructedJWTRefresh = constructureJWT(refreshToken, secret);

    // Encrypt JWT
    const encryptedAccessToken = await encrypt(constructedJWTAccess);

    // Assigning Refresh Token to the Database
    const updateQueryById = `UPDATE users
                          SET refresh_token = ${insertion(
                            constructedJWTRefresh
                          )}
                          WHERE id = ${id}
                        `;
    await client.query(updateQueryById);

    const getQueryById = `SELECT *
                          FROM users
                          FULL OUTER JOIN audio ON users.id=audio.user_id
                          WHERE users.id = ${id}
                          ORDER BY users.id;
    `;

    const user = await client.query(getQueryById);

    const userData = user.rows[0];

    const credentials = {
      id: userData.id,
      user_name: userData.user_name,
      first_name: userData.first_name,
      last_name: userData.last_name,
      age: userData.age,
      gender: userData.gender,
      vision_type: userData.vision_type,
      bio: userData.bio,
      profile_image: userData.profile_image,
      color_theme: userData.color_theme,
      email: userData.email,
      audio_accent: userData.audio_accent,
      audio_pitch: userData.audio_pitch,
      audio_speed: userData.audio_speed,
      audio_volume: userData.audio_volume,
    };

    // Send the information to the client
    res
      .cookie("access", encryptedAccessToken, {
        // maxAge: nextWeek(),
        expires: nextWeek(),
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        user: credentials,
        msg: "Sucessfully Logged In",
        ok: true,
      });
  } catch (error) {
    console.log(Object.keys(error));
    console.log(error);
    res.status(500).json({ message: "Server Error", ok: false });
  }
});

// Logout User
router.post("/logout", async (req, res) => {
  console.log("Logout Router".underline.green);
  try {
    // Assigning Refresh Token to the Database
    const updateQuery = `UPDATE users
                          SET refresh_token = NULL
                          WHERE id = ${req.body.id}
                        `;
    await client.query(updateQuery);

    res
      .clearCookie("access")
      .status(200)
      .json({ message: "Successfully Logout" });
  } catch (err) {
    console.log(err);
  }
});

// Get the Token for accessing further routes
router.post("/token", validation, async (req, res) => {
  console.log("Token Router".underline.green);
  try {
    // Initializes Secrets JWT
    const secret = {
      jwtHeader: process.env.JWT_HEADER,
      jwtPayload: process.env.JWT_PAYLOAD,
      jwtSecret: process.env.JWT_SECRET,
    };

    // Getting the information from the User
    const expired = new Date(req.cookieToken.exp * 1000);
    const now = new Date();

    console.log(expired, now, "EXPIRE AND NOW");

    // if the token expires in 1h, the refresh time should half
    const time = refreshTime(expired, process.env.EXPIRATION_TIME);

    const getQueryById = `SELECT *
                          FROM users
                          FULL OUTER JOIN audio ON users.id=audio.user_id
                          WHERE users.id = ${req.cookieToken.id}
                          ORDER BY users.id;
                          `;

    const user = await client.query(getQueryById);

    const {
      id,
      user_name,
      first_name,
      last_name,
      age,
      gender,
      vision_type,
      bio,
      profile_image,
      color_theme,
      email,
      refresh_token,
      audio_accent,
      audio_pitch,
      audio_speed,
      audio_volume,
    } = user.rows[0];

    // Validation
    if (refresh_token == null) {
      console.log("Refresh Token", refresh_token);
      return res.status(401).json({ message: "Unauthorized", ok: false });
    }

    // Reorder JWT
    const destructedJWT = destructureJWT(refresh_token, secret);

    // Validating Token
    const validToken = await verifyToken(
      destructedJWT,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (validToken.invalid) {
      console.log(`Valid Token: ${validToken}`.red);
      return res.status(401).json({
        message: "Unathorized",
        report: validToken.message,
        ok: false,
      });
    }

    // Generate Token and Secretkey
    const newAccessToken = await generateAccessToken({ id });

    // Rumble JWT
    const constructedJWT = constructureJWT(newAccessToken, secret);

    // Encrypt JWT
    const encryptedAccessToken = await encrypt(constructedJWT);

    const credentials = {
      id,
      user_name,
      first_name,
      last_name,
      age,
      gender,
      vision_type,
      bio,
      profile_image,
      color_theme,
      email,
      audio_accent,
      audio_pitch,
      audio_speed,
      audio_volume,
    };

    if (now >= time) {
      res.cookie("access", encryptedAccessToken, {
        // maxAge: nextWeek(),
        expires: nextWeek(),
        httpOnly: true,
        secure: true,
      });
    }

    res.header("auth", encryptedAccessToken).status(200).json({
      user: credentials,
      message: "Data Acquired",
      ok: true,
    });
  } catch (err) {
    console.log(Object.keys(err), "OBJECT KEYS");

    // Internal Server Error
    res.status(500).json({ message: "No Data", ok: false });
  }
});

// Updating the Profile
router.put("/profile", async (req, res) => {
  console.log("User Profile Update".underline.green);

  try {
    // Getting the data from the req body
    const {
      id,
      user_name,
      profile_image,
      first_name,
      last_name,
      age,
      gender,
      vision_type,
      bio,
    } = req.body;

    // Update the Data in the Database
    const updateQueryById = `UPDATE users 
                             SET user_name = ${insertion(user_name)},
                                 first_name = ${insertion(first_name)},
                                 last_name = ${insertion(last_name)},
                                 age = ${insertion(age)},
                                 gender = ${insertion(gender)},
                                 profile_image = ${insertion(profile_image)},
                                 vision_type = ${insertion(vision_type)},
                                 bio = ${insertion(bio)}
                             WHERE id = ${id}
                            `;

    await client.query(updateQueryById);

    res.status(200).json({ message: "Profile Successfully Updated" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/vision-result", async (req, res) => {
  console.log("User Vision Update".underline.green);

  try {
    // Getting the data from the req body
    const { id, vision_type } = req.body;

    // Update the Data in the Database
    const updateQueryById = `UPDATE users 
                             SET vision_type = ${insertion(vision_type)}
                             WHERE id = ${id}
                            `;

    await client.query(updateQueryById);

    res.status(200).json({ message: "Vision Type Successfully Updated" });
  } catch (err) {
    console.log(err);
  }
});

// Updating the Audio
router.put("/audio/:id", async (req, res) => {
  console.log("User Audio Update".underline.green);

  try {
    const { audio_accent, audio_pitch, audio_speed, audio_volume } = req.body;

    const updateQueryById = `UPDATE audio 
                               SET audio_accent = ${insertion(audio_accent)},
                                   audio_pitch = ${insertion(audio_pitch)},
                                   audio_speed = ${insertion(audio_speed)},
                                   audio_volume = ${insertion(audio_volume)}
                               WHERE id = ${req.params.id}
                              `;
    await client.query(updateQueryById);

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
});

// Getting the Audio
router.get("/audio/:id", async (req, res) => {
  console.log("User Audio Get".underline.green);
  // console.log(req.params);

  try {
    const getQueryById = `SELECT * FROM audio WHERE id = ${req.params.id}`;
    const data = await client.query(getQueryById);

    res
      .status(200)
      .json({ data: data.rows[0], msg: "Audio Data Acquired", ok: true });
  } catch (err) {
    console.log(err);
  }
});

router.put("/appearance/:id", async (req, res) => {
  console.log("User Appearance Update".underline.green);

  try {
    const updateQueryById = `UPDATE users 
                             SET color_theme = ${insertion(
                               req.body.color_theme
                             )}
                             WHERE id = ${req.params.id}
                            `;
    await client.query(updateQueryById);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
});

router.get("/appearance/:id", async (req, res) => {
  console.log("User Appearance Get".underline.green);
  try {
    const getQueryById = `SELECT color_theme FROM users WHERE id = ${req.params.id}`;
    const data = await client.query(getQueryById);

    res
      .status(200)
      .json({ data: data.rows[0], msg: "Appearance Data Acquired", ok: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;