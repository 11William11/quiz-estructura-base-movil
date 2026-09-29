import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as defineJeepSqlite } from 'jeep-sqlite/loader';
import { DATABASE_NAME, DATABASE_VERSION, SCHEMA } from './schema';

/**
 * Único punto de acceso a SQLite: abre la conexión y crea el esquema.
 * En navegador usa jeep-sqlite (SQLite en WebAssembly) y guarda la base en IndexedDB
 * después de cada escritura; en Android/iOS usa SQLite nativo.
 */
export class SqliteDatabase {
  private readonly sqlite = new SQLiteConnection(CapacitorSQLite);
  private readonly isWeb = Capacitor.getPlatform() === 'web';
  private connection: SQLiteDBConnection | null = null;

  async initialize(): Promise<void> {
    if (this.connection) return;
    if (this.isWeb) await this.initializeWebStore();

    const alreadyCreated = (await this.sqlite.isConnection(DATABASE_NAME, false)).result;
    this.connection = alreadyCreated
      ? await this.sqlite.retrieveConnection(DATABASE_NAME, false)
      : await this.sqlite.createConnection(DATABASE_NAME, false, 'no-encryption', DATABASE_VERSION, false);

    if (!(await this.connection.isDBOpen()).result) await this.connection.open();
    await this.connection.execute(SCHEMA);
    await this.persist();
  }

  async run(statement: string, values: unknown[] = []): Promise<void> {
    await this.getConnection().run(statement, values);
    await this.persist();
  }

  async query<T>(statement: string, values: unknown[] = []): Promise<T[]> {
    const result = await this.getConnection().query(statement, values);
    return (result.values ?? []) as T[];
  }

  private getConnection(): SQLiteDBConnection {
    if (!this.connection) throw new Error('La base de datos no está inicializada.');
    return this.connection;
  }

  private async initializeWebStore(): Promise<void> {
    defineJeepSqlite(window);
    document.body.appendChild(document.createElement('jeep-sqlite'));
    await customElements.whenDefined('jeep-sqlite');
    await this.sqlite.initWebStore();
  }

  private async persist(): Promise<void> {
    if (this.isWeb) await this.sqlite.saveToStore(DATABASE_NAME);
  }
}
