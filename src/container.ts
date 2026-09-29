import { RegisterProduct } from './application/products/RegisterProduct';
import { RegisterUser } from './application/users/RegisterUser';
import { SqliteDatabase } from './infrastructure/database/SqliteDatabase';
import { SqliteProductRepository } from './infrastructure/database/repositories/SqliteProductRepository';
import { SqliteUserRepository } from './infrastructure/database/repositories/SqliteUserRepository';

/**
 * Raíz de composición: único lugar donde se crean las implementaciones concretas
 * y se inyectan en los casos de uso. La presentación solo conoce los casos de uso.
 */
export const database = new SqliteDatabase();

const userRepository = new SqliteUserRepository(database);
const productRepository = new SqliteProductRepository(database);

export const registerUser = new RegisterUser(userRepository);
export const registerProduct = new RegisterProduct(productRepository);
