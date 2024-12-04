
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
