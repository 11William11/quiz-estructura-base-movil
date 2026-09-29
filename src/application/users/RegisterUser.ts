import type { UserRepository } from '../../domain/repositories/UserRepository';
import { ValidationError } from '../shared/ValidationError';
import { isBlank, isValidEmail } from '../shared/validators';

export interface RegisterUserInput {
  fullName: string;
  email: string;
}

export class RegisterUser {
  private readonly users: UserRepository;

  constructor(users: UserRepository) {
    this.users = users;
  }

  async execute(input: RegisterUserInput): Promise<void> {
    const fullName = input.fullName.trim();
    const email = input.email.trim().toLowerCase();

    const errors: string[] = [];
    if (isBlank(fullName)) errors.push('El nombre es obligatorio.');
    if (!isValidEmail(email)) errors.push('El correo no es válido.');
    if (errors.length > 0) throw new ValidationError(errors);

    if (await this.users.existsByEmail(email)) {
      throw new ValidationError(['Ya existe un usuario con ese correo.']);
    }

    await this.users.save({ fullName, email });
  }
}
