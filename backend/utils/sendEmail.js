import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendOrderConfirmation = async (email, order) => {
  try {
    // 1. Create Transporter (Connection to Email Service)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use 'gmail', 'outlook', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your App Password (NOT your normal password)
      },
    });

    // 2. Format Order Items for HTML
    const itemsHtml = order.orderItems.map(item => 
      `<li>${item.name || 'Product'} - Qty: ${item.qty} - $${item.price}</li>`
    ).join('');

    // 3. Configure Email Options
    const mailOptions = {
      from: `"TCG Republic" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #333;">Thank you for your order!</h2>
          <p>Hi there,</p>
          <p>Your order has been received and is being processed.</p>
          
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            <h3>Order Summary</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Total Price:</strong> $${order.totalPrice}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          </div>

          <h3>Items:</h3>
          <ul>
            ${itemsHtml}
          </ul>

          <p>We will notify you once your items are shipped.</p>
          <p>Best regards,<br/>The TCG Republic Team</p>
        </div>
      `,
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation sent to ${email}`);

  } catch (error) {
    console.error("Email sending failed:", error);
    // We don't throw error here to avoid failing the order creation if email fails
  }
};

export default sendOrderConfirmation;