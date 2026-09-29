import { hash } from 'bcryptjs';
import type { PasswordHasher } from '../../application/ports/PasswordHasher';

const SALT_ROUNDS = 10;

export class BcryptPasswordHasher implements PasswordHasher {
  hash(plainPassword: string): Promise<string> {
    return hash(plainPassword, SALT_ROUNDS);
  }
}
