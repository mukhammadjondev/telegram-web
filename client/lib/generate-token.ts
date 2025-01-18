import jwt from 'jsonwebtoken';

export function generateToken(userId?: string) {
  return jwt.sign({ userId }, process.env.NEXT_PUBLIC_JWT_SECRET!, {
    expiresIn: '60',
  });
}
