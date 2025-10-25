import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_secret_key';
const EXPIRATION_TIME = '15 minutes';

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, SECRET, { expiresIn: EXPIRATION_TIME });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  } 
}