const nodemailer = require('nodemailer');
const ContactSchema = require("../models/ContactSchema");
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mysecretishere';
const contactFormHandler = async(req, res)=>{

    try {
        const { name, email, phone, message } = req.body;

        const encryptedMessage = jwt.sign({message}, JWT_SECRET); 

        const newContactForm = new ContactSchema({
            name,
            email,
            phone,
            message: encryptedMessage,
        });
        await newContactForm.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL, 
                pass: process.env.MAIL_PASS    
            }
        });

        const mailOptions = {
            from: process.env.MAIL, 
            to: process.env.MAIL, 
            subject: 'New Contact Form Submission',
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({ success: true, message: "Message sent successfully!" });

    } 
    catch (error) {
        console.log("Error sending message. ",error);
        return res.status(500).json({success: false, message: "Error sending message."})
    }
   
};

const getAllForms = async (req, res) => {
    try {
        const allContacts = await ContactSchema.find();

        const decryptedMessages = allContacts.map((contact)=>{
            const decrypted = jwt.verify(contact.message, JWT_SECRET);
            return {
                ...contact.toObject(),
                message: decrypted.message
            }
        })

        return res.status(200).json({ success: true, data: decryptedMessages });
    } catch (error) {
        console.error('Error decrypting messages:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {getAllForms, contactFormHandler}