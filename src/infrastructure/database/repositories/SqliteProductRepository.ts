import type { Product } from '../../../domain/entities/Product';
import type { ProductRepository } from '../../../domain/repositories/ProductRepository';
import type { SqliteDatabase } from '../SqliteDatabase';

export class SqliteProductRepository implements ProductRepository {
  private readonly database: SqliteDatabase;

  constructor(database: SqliteDatabase) {
    this.database = database;
  }

  async save(product: Product): Promise<void> {
    await this.database.run(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?);',
      [product.name, product.description || null, product.price, product.stock],
    );
  }
}
