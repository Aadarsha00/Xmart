const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email address' 
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'hello@xsmart.io',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Also send confirmation to user
    const userConfirmation = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting XSmart',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p><em>${subject}</em></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>The XSmart Team</p>
        <p><a href="https://xsmart.io">Visit our website</a></p>
      `,
    };

    await transporter.sendMail(userConfirmation);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email address' 
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to XSmart Newsletter!',
      html: `
        <h2>Welcome to the XSmart Newsletter!</h2>
        <p>Thank you for subscribing. You'll receive the latest updates on:</p>
        <ul>
          <li>IT industry insights</li>
          <li>New service announcements</li>
          <li>Technology trends</li>
          <li>Exclusive offers</li>
        </ul>
        <p>Best regards,<br>The XSmart Team</p>
      `,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Subscribed successfully' 
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to subscribe. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'XSmart API is running' 
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'XSmart API Server',
    version: '1.0.0',
    endpoints: [
      'POST /api/contact - Submit contact form',
      'POST /api/newsletter - Subscribe to newsletter',
      'GET /api/health - Health check'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   🚀 XSmart API Server                         ║
║                                                ║
║   Running on: http://localhost:${PORT}            ║
║                                                ║
║   Endpoints:                                   ║
║   • POST /api/contact                          ║
║   • POST /api/newsletter                       ║
║   • GET  /api/health                           ║
║                                                ║
╚════════════════════════════════════════════════╝
  `);
});
