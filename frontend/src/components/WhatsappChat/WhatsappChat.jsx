import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsappChat.css';

const WhatsappChat = () => {
  // Replace with your actual phone number in international format (no + or dashes)
  // Example: 15551234567
  const phoneNumber = "1234567890"; 
  const message = "Hello! I have a question about your products.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={30} color="#fff" />
    </a>
  );
};

export default WhatsappChat;