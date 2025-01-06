const deleteAccount=async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.deletionScheduled) {
        return res.status(400).json({ message: 'Account deletion is already scheduled' });
      }
  
      const deletionDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      user.deletionScheduled = deletionDate;
      await user.save();
  
      res.status(200).json({ message: 'Account deletion scheduled', deletionDate });
    } catch (error) {
      res.status(500).json({ message: 'Error scheduling account deletion', error });
    }
  };
  
  // Cancel Account Deletion (On Login)
  app.post('/user/cancel-deletion', async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!user.deletionScheduled) {
        return res.status(400).json({ message: 'No deletion process to cancel' });
      }
  
      user.deletionScheduled = null;
      await user.save();
  
      res.status(200).json({ message: 'Account deletion canceled' });
    } catch (error) {
      res.status(500).json({ message: 'Error canceling account deletion', error });
    }
  });
  
  // Periodic Cleanup for Scheduled Deletions
  cron.schedule('0 * * * *', async () => { // Runs every hour
    const now = new Date();
  
    try {
      const usersToDelete = await User.find({
        deletionScheduled: { $lte: now },
      });
  
      if (usersToDelete.length) {
        const userIds = usersToDelete.map(user => user._id);
        await User.deleteMany({ _id: { $in: userIds } });
        console.log(`Deleted ${userIds.length} accounts`);
      }
    } catch (error) {
      console.error('Error deleting accounts:', error);
    }
  });
  
  