
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const { MONGO_URI, PORT } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.post('/webhook/zoho/leads', async (req, res) => {
  try {
    const webhookData = req.body;
    console.log('Headers:', req.headers);
    console.log('Query Params:', req.query);
    console.log('Received webhook data:', webhookData);
    const lead = new Lead(webhookData);
    await lead.save();
    console.log('Lead saved successfully:', lead);
    res.status(200).send('Success');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/webhook/sendgrid', async (req, res) => {

try {
    const webhookData = req.body;  // The SendGrid event data
    console.log('Received SendGrid webhook data:', webhookData);
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('Error processing SendGrid webhook:', error);
     res.status(500).send('Internal Server Error');
   }
  // try {
  //   // Hardcoded dummy emailData
  //   const emailData = [
  //     {
  //       "email": "st21023@gmail.com",
  //       "timestamp": 1733295343,
  //       "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
  //       "event": "unsubscribe",
  //       "category": ["cat facts"],
  //       "sg_event_id": "TSYQAunWzE4Zr8ubaWCDxA==",
  //       "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0"
  //     },
  //     {
  //       "email": "st21024@gmail.com",
  //       "timestamp": 1733295343,
  //       "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
  //       "event": "group_unsubscribe",
  //       "category": ["cat facts"],
  //       "sg_event_id": "hdtOlKupDV5Pj7qy7qd9FQ==",
  //       "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
  //       "useragent": "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
  //       "ip": "255.255.255.255",
  //       "url": "http://www.sendgrid.com/",
  //       "asm_group_id": 10
  //     },
  //     {
  //       "email": "st21025@gmail.com",
  //       "timestamp": 1733295343,
  //       "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
  //       "event": "group_resubscribe",
  //       "category": ["cat facts"],
  //       "sg_event_id": "kO5XPEde-GpFTp-b8mdojQ==",
  //       "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
  //       "useragent": "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
  //       "ip": "255.255.255.255",
  //       "url": "http://www.sendgrid.com/",
  //       "asm_group_id": 10
  //     }
  //   ];

  //   // Extract emails from the hardcoded emailData
  //   const emails = emailData.map(item => item.email.trim());
  //   const leads = await Lead.find({ Email: { $in: emails } });

  //   if (leads.length > 0) {
  //     const responseData = emailData.map(item => {
  //       const lead = leads.find(lead => lead.Email.trim() === item.email.trim());

  //       return {
  //         ...item,
  //         Lead_Owner: lead ? lead.Lead_Owner : null
  //       };
  //     });

    
  //     return res.status(200).json(responseData); 
  //   } else {
  //     return res.status(404).json({ message: 'No matching leads found for the provided emails.' });
  //   }

  // } catch (error) {
  //   console.error('Error processing webhook:', error);
  //   // Only send one response, don't do a second res.send after an error
  //   return res.status(500).send('Internal Server Error');
  // }
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
