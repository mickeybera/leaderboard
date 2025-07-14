import User from '../model/User.model.js';
import History from '../model/History.model.js';

export const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    const history = new History({
      userId: user._id,
      userName: user.name,
      pointsClaimed: points
    });
    await history.save();

    res.json({ user, points });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ claimedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
