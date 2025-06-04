const mongoose = require('mongoose');
const cron = require('node-cron');
const Campaign = require('../models/campaignModel');


mongoose.set('strictQuery', true);


mongoose.connect('mongodb://localhost:27017/campaignDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('[✓] Scheduler connected to MongoDB'))
.catch(err => {
  console.error('[x] MongoDB connection error:', err);
  process.exit(1); // exit if unable to connect
});


cron.schedule('* * * * *', async () => {
  const now = new Date();
  console.log(`[${now.toISOString()}] Checking for due campaigns...`);

  try {
    
    const dueCampaigns = await Campaign.find({
      scheduledTime: { $lte: now },
      sent: false,
    });

    if (dueCampaigns.length === 0) {
      console.log('No campaigns to send at this time.\n');
      return;
    }

    for (const campaign of dueCampaigns) {
      for (const email of campaign.emails) {
       
        console.log(`📧 Sending email to ${email} [Campaign: ${campaign.campaignName}]`);
      }

      
      campaign.sent = true;
      await campaign.save();

      console.log(`✅ Campaign "${campaign.campaignName}" marked as sent.\n`);
    }
  } catch (error) {
    console.error('🚨 Scheduler error:', error);
  }
});
