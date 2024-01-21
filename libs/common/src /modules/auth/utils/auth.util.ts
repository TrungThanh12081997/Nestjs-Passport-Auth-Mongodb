import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const validatePassword = (password = '', hash: string) =>
  bcrypt.compare(crypto.createHash('sha256').update(password).digest('hex'), hash) as Promise<boolean>;
