/** Error de reglas de negocio: la presentación muestra `messages` al usuario. */
export class ValidationError extends Error {
  readonly messages: string[];

  constructor(messages: string[]) {
    super(messages.join(' '));
    this.name = 'ValidationError';
    this.messages = messages;
  }
}
