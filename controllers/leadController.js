const Lead = require('../models/leadModel');


exports.getLeadsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const leads = await Lead.find({ userId });

    if (leads.length === 0) {
      return res.status(404).json({ message: 'No leads found for this user.' });
    }

    res.status(200).json({ leads });
  } catch (error) {
    console.error('Fetch leads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
