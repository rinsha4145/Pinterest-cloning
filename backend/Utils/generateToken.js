const jwt = require("jsonwebtoken");
const generateToken = (user, res) => {
  if (!user.admin) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    // Set cookies for tokens
    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("user", user, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } else {
    const admtoken = jwt.sign(
      { id: user._id, admin: true },
      process.env.ADM_JWT_KEY,
      { expiresIn: "30d" }
    );
    const admrefreshToken = jwt.sign(
      { id: user._id, admin: true },
      process.env.ADM_JWT_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("admin", user, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("admtoken", admtoken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.cookie("admrefreshToken", admrefreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ status: "success", message: "Admin Logged in successfully" });
  }
};

module.exports = { generateToken };
