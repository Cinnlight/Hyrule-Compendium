import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// TODO: When a user registers, generate a random string, save it in the database, and send it to the user's email
// User data should be an object with the following properties: display_name, email
const sendEmailVerification = async (userData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export default sendEmail;





// TODO: Move this to the routes
post('/api/contact', async (req, res) => {
  try {
    await transporter.verify();

    const { display_name, email } = req.body;

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `{display_name} ZOne Email Verification`,
      html: `
        // TODO: Take a random generated string, save it in the database, and send it to the user's email
      `
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: {
        code: error.code,
        response: error.response
      }
    });
  }
});