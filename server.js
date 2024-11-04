// server.js

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Configure SMTP settings for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tj@team-altitude.com', // Your Gmail address
        pass: 'your-app-password'      // Your Google App Password, not your regular password
    }
});

// Endpoint to send the email to your Gmail inbox
app.post('/send-quote', async (req, res) => {
    const {
        email, minQuote, maxQuote, firstName, lastName, company, phone, additionalDetails,
        companyAddress, companyCity, companyState, companyZip, serviceLocationName, serviceLocation,
        serviceCity, serviceState, serviceZip, startDate, endDate, requestedDays, hoursPerDay,
        serviceShiftTime, guardsPerShift, serviceType, locationType
    } = req.body;

    // Prepare email details with all client information
    const mailOptions = {
        from: 'tj@team-altitude.com',
        to: 'tj@team-altitude.com', // Send to your Gmail inbox
        subject: 'New Service Quote Request',
        text: `Client Information:
               Name: ${firstName} ${lastName}
               Email: ${email}
               Phone: ${phone}
               Company: ${company}
               Company Address: ${companyAddress}, ${companyCity}, ${companyState} ${companyZip}

               Service Location Information:
               Location Name: ${serviceLocationName}
               Location Address: ${serviceLocation}, ${serviceCity}, ${serviceState} ${serviceZip}

               Service Details:
               Requested Start Date: ${startDate}
               Requested End Date: ${endDate}
               Requested Days: ${requestedDays}
               Coverage Hours per Day: ${hoursPerDay}
               Service Shift Time: ${serviceShiftTime}
               Guards Per Shift: ${guardsPerShift}
               Service Type: ${serviceType}
               Location Type: ${locationType}

               Quote Estimate:
               Estimated Quote Range: $${minQuote} - $${maxQuote}

               Additional Details:
               ${additionalDetails}`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent to Gmail inbox');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});