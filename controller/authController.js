// external imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../model/peopleSchema");

// signup
exports.signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hased = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hased });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Debug ", err);
    res.send(`<h1>${err._message}</h1>`);
  }
};

// login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.status(200).json({ msg: "Users not found" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      res.status(401).json({
        error: "Authetication failed!",
      });
    } else {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIERY }
      );
      // set cookie
    //   res.cookie(process.env.COOKIE_NAME, token, {
    //     maxAge: process.env.JWT_EXPIRY,
    //     httpOnly: true,
    //     signed: true,
    //   });
      res.status(200).json({
        access_token: token,
        message: "Login successful!",
      });
    }
  } catch (err) {
    console.log("Debug ", err);
    res.status(400).send(`<h1>${err._message}</h1>`);
  }
};

// logout
exports.logout = function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}


