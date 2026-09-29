/** Puerto: la aplicación necesita hashear contraseñas sin depender de una librería concreta. */
export interface PasswordHasher {
  hash(plainPassword: string): Promise<string>;
}
