const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node generate-password-hash.js <password>');
  process.exit(1);
}

const saltRounds = 12;
bcrypt.hash(password, saltRounds).then(hash => {
  console.log('Password hash for .env.local:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}); 