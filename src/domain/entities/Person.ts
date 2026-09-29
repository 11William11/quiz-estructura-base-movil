export interface Person {
  id?: number;
  documentNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  /** Fecha ISO (yyyy-mm-dd) o cadena vacía si no se informa. */
  birthDate: string;
}
