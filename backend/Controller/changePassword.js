const bcrypt = require('bcrypt');
const User = require('../Models/User/userSchema'); // Assuming you have a User model


// Password reset route
const changePass=async (req, res) => {
  const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Validate the new password (simple validation, you can expand this)
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password should be at least 6 characters' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password successfully updated' });
 
};

module.exports = {changePass};
