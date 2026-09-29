import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { PasswordHasher } from '../ports/PasswordHasher';
import { ValidationError } from '../shared/ValidationError';
import { isBlank, isValidEmail } from '../shared/validators';

const MIN_PASSWORD_LENGTH = 8;

export interface RegisterUserInput {
  fullName: string;
  email: string;
  password: string;
}

export class RegisterUser {
  private readonly users: UserRepository;
  private readonly passwordHasher: PasswordHasher;

  constructor(users: UserRepository, passwordHasher: PasswordHasher) {
    this.users = users;
    this.passwordHasher = passwordHasher;
  }

  async execute(input: RegisterUserInput): Promise<void> {
    const fullName = input.fullName.trim();
    const email = input.email.trim().toLowerCase();

    const errors: string[] = [];
    if (isBlank(fullName)) errors.push('El nombre es obligatorio.');
    if (!isValidEmail(email)) errors.push('El correo no es válido.');
    if (input.password.length < MIN_PASSWORD_LENGTH) {
      errors.push(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`);
    }
    if (errors.length > 0) throw new ValidationError(errors);

    if (await this.users.existsByEmail(email)) {
      throw new ValidationError(['Ya existe un usuario con ese correo.']);
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    await this.users.save({ fullName, email, passwordHash });
  }
}
