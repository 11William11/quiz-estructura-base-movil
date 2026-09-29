import type { Person } from '../../../domain/entities/Person';
import type { PersonRepository } from '../../../domain/repositories/PersonRepository';
import type { SqliteDatabase } from '../SqliteDatabase';

export class SqlitePersonRepository implements PersonRepository {
  private readonly database: SqliteDatabase;

  constructor(database: SqliteDatabase) {
    this.database = database;
  }

  async save(person: Person): Promise<void> {
    await this.database.run(
      `INSERT INTO persons (document_number, first_name, last_name, phone, birth_date)
       VALUES (?, ?, ?, ?, ?);`,
      [person.documentNumber, person.firstName, person.lastName, person.phone || null, person.birthDate || null],
    );
  }

  async existsByDocumentNumber(documentNumber: string): Promise<boolean> {
    const rows = await this.database.query<{ total: number }>(
      'SELECT COUNT(*) AS total FROM persons WHERE document_number = ?;',
      [documentNumber],
    );
    return (rows[0]?.total ?? 0) > 0;
  }
}
