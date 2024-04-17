const joi = require("joi");
const hashPassword = require("../helpers/hashPassword");
const generateToken = require("../helpers/generateToken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const registerValidator = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
async function Logout(req, res, next) {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}
async function Register(req, res, next) {
  const { name, email, password } = req.body;
  const account = await User.findOne({ email: email });
  if (account) return res.status(400).json({ msg: "Email is already exist" });
  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) return next({ status: 500 });
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  const validation = registerValidator.validate(req.body);
  if (validation.error) {
    const errorDetails = validation.error.details
      .map((d) => d.message)
      .join("<br>");
    res.send(`<h2>Vaildation Error: </h2>${errorDetails}`);
    return;
  }
  try {
    await user.save();
    if (!user) return res.status(500).json(error.details[0].message);
    const token = await generateToken({ id: user._id, name: user.name });
    if (!token) return next({ status: 500 });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ msg: "Registered Susscefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
async function Login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email and Password can not be Empty" });
  const account = await User.findOne({ email: email });
  if (!account)
    return res.status(400).json({ msg: "Invalid Email or Password" });
  const validPassword = bcrypt.compareSync(password, account.password);
  if (!validPassword) {
    return res.status(403).json({ msg: "Invalid Email or Password" });
  }
  try {
    const token = await generateToken({ id: account._id, name: account.name });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ msg: "LoggedIn", data: account });
  } catch (error) {
    console.log("Login failed with error : ", error);
    return res.status(500).json({ msg: error });
  }
}
module.exports = {
  Register,
  Login,
  Logout,
};
