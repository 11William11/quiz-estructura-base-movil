import type { Person } from '../entities/Person';

export interface PersonRepository {
  save(person: Person): Promise<void>;
  existsByDocumentNumber(documentNumber: string): Promise<boolean>;
}
