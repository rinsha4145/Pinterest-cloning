const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const forgottpass=async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const token = crypto.randomBytes(32).toString('hex');
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000; // 1 hour validity
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      });
  
      res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Error processing request' });
    }
  };
module.exports = { forgottpass};
