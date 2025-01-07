const jwt = require("jsonwebtoken");

const generateToken = (user, res) => {
  if (!user.admin) {
    // Generate tokens for non-admin users
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '3d' });
    const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '7d' });

    // Set cookies for non-admin tokens
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ status: 'success', message: "User logged in successfully" });
  }

  // Generate tokens for admin users
  const adminToken = jwt.sign({ id: user._id, admin: true }, process.env.const { generateToken } = require('../../Utils/generateToken');
  , { expiresIn: '30d' });
  const adminRefreshToken = jwt.sign({ id: user._id, admin: true }, process.env.ADM_JWT_KEY, { expiresIn: '7d' });

  // Set cookies for admin tokens
  res.cookie("admtoken", adminToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.cookie("admrefreshToken", adminRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({ status: 'success', message: "Admin logged in successfully" });
};

module.exports = { generateToken };
