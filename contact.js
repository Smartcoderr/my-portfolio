import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Check if the required fields are present
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a transport using a real email service (e.g., Gmail, SendGrid)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Use environment variable for security
        pass: process.env.EMAIL_PASS,  // Use environment variable for security
      },
    });

    const mailOptions = {
      from: email, // sender's email
      to: 'your-email@example.com', // your email address
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error sending message' });
    }
  } else {
    // Only POST requests are allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
