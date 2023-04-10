// Imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Create Object
const knexService = require("../../util/knexService");
const knexUser = new knexService("authorization");
const insertion = require("../../util/postgresService");

// Client Postgres
const client = require("../../util/connectPostgres");

client.connect((err) => {
  if (err) throw err;
  console.log("PG Connected");
});

// Importing Services
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  encrypt,
} = require("../../util/tokenService");

const { refreshTime, nextWeek } = require("../../util/timeService");

// Validation
const validation = require("../../util/validation");
const { properCase } = require("../../util/textService");

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

    console.log(id);

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

    const encryptedAccessToken = await encrypt(accessToken);

    // Assigning Refresh Token to the Database
    const updateQueryById = `UPDATE users
                          SET refresh_token = ${insertion(refreshToken)}
                          WHERE id = ${id}
                        `;
    await client.query(updateQueryById);

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
        user: {
          id,
          name: user_name,
          email,
          img: profile_image,
          token: encryptedAccessToken,
        },
        message: "Sucessfully Logged In",
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
    // Getting the information from the User
    const expired = new Date(req.cookieToken.exp * 1000);
    const now = new Date();
    // if the token expires in 1h, the refresh time should half
    const time = refreshTime(expired, process.env.EXPIRATION_TIME);

    // const user = await knexUser.getDataById(req.cookieToken.id);
    const getQueryById = `SELECT *
                          FROM users
                          WHERE id = ${req.cookieToken.id}
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
      email,
      refresh_token,
    } = user.rows[0];

    // console.log;

    // Validation
    if (refresh_token == null) {
      console.log("Refresh Token", refresh_token);
      return res.status(401).json({ message: "Unauthorized", ok: false });
    }

    const validToken = await verifyToken(
      refresh_token,
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
    const encryptedAccessToken = await encrypt(newAccessToken);

    const credentials = {
      id,
      user_name,
      profile_image,
      email,
      first_name,
      last_name,
      age,
      gender,
      vision_type,
      bio,
    };

    if (now >= time) {
      res.cookie("access", encryptedAccessToken, {
        // maxAge: nextWeek(),
        expires: nextWeek(),
        httpOnly: true,
        secure: true,
      });
    }

    res.status(200).json({
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

    console.log(req.body);

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
