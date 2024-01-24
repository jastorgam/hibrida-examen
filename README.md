# Examen Programación Hibrida

Aplicación inicia en list-post

### Clases

Como el problema a solucionar no es complejo, solo utilice una clase

- PostData

  ```ts
  export class PostData {
    id: string = uuid();
    title!: string;
    description!: string;
    image: string | undefined;
    creationDate: Date = new Date();
  }
  ```

### Paginas

- list-post
- create-post

### Componentes

- add-post
  - Creación de publicación. Emite un evento a create-post al grabar
- post
  - Elemento publicación, es llamado dentro de list-post

### Servicios

- PostService
  - Servicio de storage. Se utilizo Preferences.

### Librerias adicionales

Para dejar un id unico por post en la clase PostData, utilice la libreria uuid

```bash
npm i uuid
```

```ts
import { v4 as uuid } from "uuid";
...
 id: string = uuid();
```

## Juan Astorga
