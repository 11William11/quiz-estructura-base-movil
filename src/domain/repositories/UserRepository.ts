import type { User } from '../entities/User';

export interface UserRepository {
  save(user: User): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}
