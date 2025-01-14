const nodemailer = require("nodemailer");
const User = require("../Models/User/userSchema");
const crypto = require("crypto");
const cron = require("node-cron");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Account Deletion Scheduling
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.deletionScheduled) {
      return res
        .status(400)
        .json({ message: "Account deletion is already scheduled" });
    }

    // Generate a unique token for confirmation
    const deletionToken = crypto.randomBytes(32).toString("hex");
    const deletionTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Token valid for 24 hours

    user.deletionToken = deletionToken;
    user.deletionTokenExpiry = deletionTokenExpiry;
    await user.save();

    // Schedule the account deletion for 7 days from now
    const deletionDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    user.deletionScheduled = deletionDate;
    await user.save();

    // Send confirmation email to the user
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Account Deletion Scheduled",
      html: `
        <p>Your account deletion request has been scheduled for ${deletionDate}. If you want to cancel this, please log in before that time.</p>
        <p>If you want to delete your account right away , please click the button below:</p>
        // <a href="http://localhost:3000/confirm-deletion/${deletionToken}"  style="padding: 10px 20px; background-color: #ff0000; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Confirm Account Deletion</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({
        message: "Account deletion scheduled, confirmation email sent",
        deletionDate,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scheduling account deletion", error });
  }
};

// Confirm Account Deletion by Clicking Button it delete the account right away
const confirmDeletion = async (req, res) => {
  const { deletionToken } = req.params;

  try {
    const user = await User.findOne({
      deletionToken,
      deletionTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Proceed with account deletion
    await User.deleteOne({ _id: user._id });

    res
      .status(200)
      .json({ message: "Your account has been deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error confirming account deletion", error });
  }
};

// Cancel Account Deletion on Login
const cancelDeletionOnLogin = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.deletionScheduled) {
      // Cancel the deletion process
      user.deletionScheduled = null;
      user.deletionToken = null;
      user.deletionTokenExpiry = null;
      await user.save();

      // Send cancellation email to the user
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Account Deletion Canceled",
        html: `<p>Your account deletion request has been canceled because you logged in. If you still wish to delete your account, you can request it again.</p>`,
      };
      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ message: "Account deletion canceled and email sent." });
    }

    return res
      .status(200)
      .json({ message: "No deletion scheduled for this account." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error canceling account deletion", error });
  }
};

// Periodic Cleanup for Scheduled Deletions (Cron job runs every hour)
cron.schedule("0 * * * *", async () => {
  const now = new Date();

  try {
    const usersToDelete = await User.find({
      deletionScheduled: { $lte: now },
    });

    if (usersToDelete.length) {
      const userIds = usersToDelete.map((user) => user._id);
      await User.deleteMany({ _id: { $in: userIds } });
      console.log(`Deleted ${userIds.length} accounts`);
    }
  } catch (error) {
    console.error("Error deleting accounts:", error);
  }
});

module.exports = { deleteAccount, confirmDeletion, cancelDeletionOnLogin };
