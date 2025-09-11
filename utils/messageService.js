const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

await client.messages.create({
  from: 'whatsapp:+14155238886', // Twilio Sandbox/Business number
  to: 'whatsapp:+9199xxxxxxxx',  // Customer's WhatsApp number
  body: `Hi ${customerName}, your insurance premium is due on ${premiumDate}. Please make the payment on time.`
});