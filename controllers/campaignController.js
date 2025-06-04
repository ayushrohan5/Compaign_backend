const Campaign = require('../models/campaignModel');


exports.createCampaign = async (req, res) => {
  try {
    const { userId, campaignName, scheduledTime, emails } = req.body;

    if (!userId || !campaignName || !scheduledTime || !emails?.length) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCampaign = await Campaign.create({
      userId,
      campaignName,
      scheduledTime,
      emails,
    });

    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
