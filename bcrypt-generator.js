const bcrypt = require('bcryptjs');

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @param {number} saltRounds - Number of salt rounds (default: 10)
 * @returns {Promise<string>} - Hashed password
 */
async function hashPassword(password, saltRounds = 10) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
}

/**
 * Compare plain password with hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} - True if passwords match
 */
async function comparePassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password: ' + error.message);
  }
}

/**
 * Generate multiple hashed passwords
 */
async function generateHashedPasswords() {
  console.log('🔐 BCRYPT PASSWORD HASH GENERATOR');
  console.log('='.repeat(50));

  // Test passwords to hash
  const passwords = [
    'admin123',
    'user456', 
    'password',
    'mySecretPass',
    'player1',
    'testuser123'
  ];

  const hashedPasswords = [];

  for (const password of passwords) {
    try {
      const hashed = await hashPassword(password);
      hashedPasswords.push({ password, hashed });

      console.log(`\nPassword: "${password}"`);
      console.log(`Hashed:   ${hashed}`);
      console.log(`Length:   ${hashed.length} characters`);

    } catch (error) {
      console.error(`Error hashing "${password}":`, error.message);
    }
  }

  return hashedPasswords;
}

generateHashedPasswords()