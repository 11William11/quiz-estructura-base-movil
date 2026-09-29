# Solución — Estructura base con SQLite

**Estudiante:** William Erney Collo Narvaez (`11William11`)
**Tecnología:** Ionic React + TypeScript + Capacitor + SQLite (`@capacitor-community/sqlite`; en navegador usa `jeep-sqlite`, SQLite en WebAssembly).

## Cómo ejecutar

```bash
npm install      # también copia sql-wasm.wasm a public/assets
npm run dev      # http://localhost:5173
```

## Estructura

```
src/
├── domain/                     # Qué es el negocio (no depende de nada)
│   ├── entities/               # User, Product, Person
│   └── repositories/           # Contratos: UserRepository, ProductRepository, PersonRepository
├── application/                # Casos de uso + reglas de validación
│   ├── users/RegisterUser.ts
│   ├── products/RegisterProduct.ts
│   ├── persons/RegisterPerson.ts
│   └── shared/                 # ValidationError y validadores
├── infrastructure/
│   └── database/               # SQLite: conexión, esquema y repositorios concretos
├── presentation/               # Pantallas Ionic (solo UI)
│   ├── users/  products/  persons/
│   ├── shared/                 # Hook y componente comunes de formulario
│   └── App.tsx                 # Tabs y rutas
├── container.ts                # Raíz de composición (inyección de dependencias)
└── main.tsx                    # Arranque: abre SQLite y luego renderiza
```

Flujo: **Pantalla → Caso de uso → Interfaz de repositorio ← Repositorio SQLite**.
La pantalla no valida ni escribe SQL; el dominio no sabe que existe SQLite.

## Decisiones

| Decisión | Por qué |
|---|---|
| Capas domain / application / infrastructure / presentation | Separar interfaz, lógica y persistencia, como pide el enunciado |
| Interfaces de repositorio en `domain` | Se puede cambiar SQLite por otra fuente sin tocar casos de uso ni pantallas |
| `container.ts` | Único lugar que conoce las clases concretas |
| Un solo `SqliteDatabase` | Una conexión, esquema con `CREATE TABLE IF NOT EXISTS`, consultas parametrizadas (`?`) |
| Usuario: nombre + correo (sin contraseña) | No se pide login; no se guardan datos que no se usan |
| Producto: nombre + precio. Persona: documento, nombres, apellidos | Solo los campos esenciales, sin extras |
| Correo y documento únicos (`UNIQUE` + validación previa) | Evitar duplicados y mostrar un mensaje claro en vez del error de SQLite |
| Código en inglés, textos de pantalla en español | Consistencia de nombres; la app es para usuarios hispanohablantes |

## Uso de IA

Se usó **Claude (Claude Code)** como apoyo:

- Análisis del enunciado y propuesta de estructura por capas.
- Generación del código base (dominio, casos de uso, SQLite, pantallas de usuarios y productos).
- Diagnóstico de un error: `jeep-sqlite` 2.8.0 exige `sql.js` 1.11.0 (con otra versión el `.wasm` no carga).

Decisiones tomadas por mí: idioma del código, campos de cada entidad, no guardar contraseña (no hay login), validaciones, navegación por tabs.
La pantalla de personas (`RegisterPersonPage.tsx`) y su conexión en `container.ts` y `App.tsx` las integré yo siguiendo la guía de la IA.
Los commits generados con IA llevan `Co-Authored-By: Claude`.
