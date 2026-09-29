import type { User } from '../../../domain/entities/User';
import type { UserRepository } from '../../../domain/repositories/UserRepository';
import type { SqliteDatabase } from '../SqliteDatabase';

export class SqliteUserRepository implements UserRepository {
  private readonly database: SqliteDatabase;

  constructor(database: SqliteDatabase) {
    this.database = database;
  }

  async save(user: User): Promise<void> {
    await this.database.run(
      'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?);',
      [user.fullName, user.email, user.passwordHash],
    );
  }

  async existsByEmail(email: string): Promise<boolean> {
    const rows = await this.database.query<{ total: number }>(
      'SELECT COUNT(*) AS total FROM users WHERE email = ?;',
      [email],
    );
    return (rows[0]?.total ?? 0) > 0;
  }
}
