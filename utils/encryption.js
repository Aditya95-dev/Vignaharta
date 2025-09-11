const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const masterPassword = 'Mitroz@123'; // Replace with a strong passphrase
const iv = crypto.randomBytes(16);

// Generate a strong encryption key from the master password
const key = crypto.createHash('sha256').update(masterPassword).digest();

// Encryption function
function encrypt(text) {
  const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`; // Store IV with encrypted data
}

// Decryption function
function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
module.exports = {
  encrypt,
  decrypt,
};