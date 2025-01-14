const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const forgotpass = async (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    console.log(user);
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
};
module.exports = { forgotpass };
