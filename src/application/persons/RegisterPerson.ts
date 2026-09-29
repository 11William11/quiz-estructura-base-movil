import type { PersonRepository } from '../../domain/repositories/PersonRepository';
import { ValidationError } from '../shared/ValidationError';
import { isBlank, isDigitsOnly } from '../shared/validators';

export interface RegisterPersonInput {
  documentNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
}

export class RegisterPerson {
  private readonly persons: PersonRepository;

  constructor(persons: PersonRepository) {
    this.persons = persons;
  }

  async execute(input: RegisterPersonInput): Promise<void> {
    const documentNumber = input.documentNumber.trim();
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const phone = input.phone.trim();
    const birthDate = input.birthDate.trim();

    const errors: string[] = [];
    if (!isDigitsOnly(documentNumber)) errors.push('El documento es obligatorio y solo admite números.');
    if (isBlank(firstName)) errors.push('Los nombres son obligatorios.');
    if (isBlank(lastName)) errors.push('Los apellidos son obligatorios.');
    if (phone !== '' && !isDigitsOnly(phone)) errors.push('El teléfono solo admite números.');
    if (birthDate !== '' && new Date(birthDate) > new Date()) {
      errors.push('La fecha de nacimiento no puede ser futura.');
    }
    if (errors.length > 0) throw new ValidationError(errors);

    if (await this.persons.existsByDocumentNumber(documentNumber)) {
      throw new ValidationError(['Ya existe una persona con ese documento.']);
    }

    await this.persons.save({ documentNumber, firstName, lastName, phone, birthDate });
  }
}
