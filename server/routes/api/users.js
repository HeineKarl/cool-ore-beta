// Imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Create Object
const knexService = require("../../util/knexService");
const knexUser = new knexService("authorization");

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

router.put("/user-profile", async (req, res) => {
  console.log("User Profile Update".underline.green);

  try {
    // Getting the data from the req body
    const {
      id,
      username,
      userImage,
      firstname,
      lastname,
      age,
      gender,
      colorVisionType,
      bio,
    } = req.body;
    console.log(req.body);

    // Update the Data in the Database
    await knexUser.updateData(id, {
      username,
      userImage,
      firstname,
      lastname,
      age,
      gender,
      colorVisionType,
      bio,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/logout", async (req, res) => {
  console.log("Logout Router".underline.green);
  try {
    await knexUser.updateData(req.body.id, {
      refreshToken: null,
      online: false,
    });

    res
      .clearCookie("access")
      .status(200)
      .json({ message: "Successfully Logout" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/token", validation, async (req, res) => {
  console.log("Token Router".underline.green);
  try {
    // Getting the information from the User
    const expired = new Date(req.cookieToken.exp * 1000);
    const now = new Date();
    // if the token expires in 1h, the refresh time should half
    const time = refreshTime(expired, process.env.EXPIRATION_TIME);

    const user = await knexUser.getDataById(req.cookieToken.id);
    const {
      id,
      username,
      firstname,
      lastname,
      age,
      gender,
      colorVisionType,
      bio,
      userImage,
      email,
      refreshToken,
    } = user[0];

    // Validation
    if (refreshToken == null) {
      console.log("Refresh Token", refreshToken);
      return res.status(401).json({ message: "Unauthorized", ok: false });
    }

    const validToken = await verifyToken(
      refreshToken,
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
      username,
      userImage,
      email,
      firstname,
      lastname,
      age,
      gender,
      colorVisionType,
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

router.post("/login", async (req, res) => {
  console.log("Login Route".underline.green);
  try {
    // Verify Data
    const data = await knexUser.verifyData("email", req.body.email);

    // If Data is Empty
    if (data.length == 0)
      return res.status(404).json({ message: "Invalid User", ok: false });

    // Compare the Password
    const verified = await bcrypt.compare(req.body.password, data[0].password);
    // console.log(verified);

    // If not verified
    if (!verified)
      return res
        .status(401)
        .json({ message: "Invalid Credentials", ok: false });

    // Get different attributes
    const { id, username, email, userImage } = data[0];

    // Generate Access Token and Refresh Token
    const accessToken = await generateAccessToken({ id });
    const refreshToken = await generateRefreshToken({ id });

    const encryptedAccessToken = await encrypt(accessToken);

    // Assigning Refresh Token to the Database
    await knexUser.updateData(id, { refreshToken, online: true });

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
        user: { id, name: username, img: userImage, email },
        message: "Sucessfully Logged In",
        ok: true,
      });
  } catch (error) {
    console.log(Object.keys(error));
    console.log(error);
    res.status(500).json({ message: "Server Error", ok: false });
  }
});

router.post("/register", async (req, res) => {
  console.log("Register Route".underline.green);
  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating user
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Inserting User in the Database
    const data = await knexUser.insertData(newUser);

    // If data is error
    if (!data)
      return res
        .status(404)
        .json({ message: "User cannot register", ok: false });

    // Sending data to the user
    res
      .status(201)
      .json({ user: data[0], message: "Successfully Registered", ok: true });
  } catch (err) {
    console.log(`${err}`.red);

    // If registering duplicate email
    if (err.code == "SQLITE_CONSTRAINT") {
      res.status(409).json({
        message: "Email is already used!",
        ok: false,
        report: properCase(err.code),
      });
      return;
    }

    // If server crashed or bad request
    res.status(500).json({ message: "There is a bad request", ok: false });
    console.error(`Error at Post Request --> ${err}`);
  }
});

module.exports = router;
