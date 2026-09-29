import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ValidationError } from '../shared/ValidationError';
import { isBlank, isNonNegativeNumber } from '../shared/validators';

export interface RegisterProductInput {
  name: string;
  price: number;
}

export class RegisterProduct {
  private readonly products: ProductRepository;

  constructor(products: ProductRepository) {
    this.products = products;
  }

  async execute(input: RegisterProductInput): Promise<void> {
    const name = input.name.trim();

    const errors: string[] = [];
    if (isBlank(name)) errors.push('El nombre es obligatorio.');
    if (!isNonNegativeNumber(input.price)) errors.push('El precio debe ser un número mayor o igual a 0.');
    if (errors.length > 0) throw new ValidationError(errors);

    await this.products.save({ name, price: input.price });
  }
}
