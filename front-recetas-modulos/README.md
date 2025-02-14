# 🍽️ Recetas App (Frontend en Angular)

Este proyecto es la interfaz frontend desarrollada en Angular para consumir la API de recetas creada en Laravel. Forma parte del proceso de aprendizaje en la empresa y está diseñado para conectarse tanto con la API propia como con la API pública de TheMealDB.

## 🚀 Características
- Conexión con la API de recetas en Laravel.
- Consumo de API pública de recetas (TheMealDB).
- CRUD completo de recetas desde el frontend.
- Autenticación mediante tokens.
- Filtros por categorías, áreas e ingredientes.
- Paginación de recetas.
- Interfaz diseñada con Tailwind CSS y componentes de Flowbite.
- Cambio de idioma entre inglés y español mediante un botón en la interfaz cerca del login.

## 📌 Tecnologías utilizadas
- **Framework:** Angular (versión inferior a 17)
- **Estructura:** Organización basada en módulos y carpetas para facilitar escalabilidad y mantenimiento.
- **Estilos:** Tailwind CSS + Flowbite
- **Manejo de estado:** Observables y servicios
- **Cliente HTTP:** HttpClient de Angular
- **Autenticación:** Interceptores para manejo de tokens

## 📂 Estructura del proyecto
El proyecto sigue una estructura modular organizada en carpetas, incluyendo:
- `component` → Componentes reutilizables.
- `detalle-receta` → Vista del detalle de una receta.
- `formulario` → Formularios de creación y edición.
- `footer`, `header` → Secciones de la interfaz.
- `interceptor` → Manejo de interceptores para autenticación.
- `layout` → Componentes de diseño de la aplicación.
- `list` → Listado de recetas.
- `login` → Página de autenticación.
- `models` → Definición de modelos de datos.
- `pagina-inicio` → Página principal de la aplicación.
- `receta` → Módulo relacionado con recetas.
- `service` → Servicios para comunicación con la API.
- `environments` → Configuración de entornos.

## 🧭 Navegación en la aplicación
La aplicación sigue una estructura de navegación clara y sencilla:

1️⃣ **Página de inicio**: 
   - Muestra un mensaje de bienvenida "Bienvenido a recetas.com".
   - Contiene dos recuadros con enlaces:
     - Uno para la API propia.
     - Otro para la API pública, donde se listan recetas externas.
   - Incluye un enlace de asistencia y contacto.
   - En la parte superior, el encabezado muestra el título de la aplicación y un botón de login.

2️⃣ **Autenticación**:
   - Al presionar el botón de login, el usuario es dirigido a la vista de autenticación.
   - Tras iniciar sesión correctamente, es redirigido a la página principal de recetas propias.

3️⃣ **Página principal (Home)**:
   - Lista todas las recetas de la API propia.
   - En el lado izquierdo, se muestran las categorías disponibles, permitiendo filtrar recetas por categoría.
   - En el lado derecho, se muestra una lista de áreas culinarias, permitiendo filtrar por área.
   - Si se selecciona una categoría o un área, la lista de recetas se regenera automáticamente.
   - En el lado derecho, hay un panel de acciones con tres botones:
     - **Crear receta**: Redirige a un formulario para añadir nuevas recetas.
     - **Mis recetas**: Muestra solo las recetas creadas por el usuario.
     - **Todas las recetas**: Lista todas las recetas disponibles en la API propia.
   - Si se cambia entre "Mis recetas" y "Todas las recetas", la lista se actualiza automáticamente.
   - La lista de recetas cuenta con paginación para facilitar la navegación entre recetas.

4️⃣ **Vista de detalles de una receta**:
   - Permite visualizar los detalles de una receta.
   - Si la receta es propiedad del usuario, se habilitan opciones para **editar** o **eliminar** la receta.

5️⃣ **Página de recetas de la API pública**:
   - Contiene un enlace llamado "Otras recetas", donde se listan recetas externas provenientes de TheMealDB.
   - Las recetas pueden filtrarse por categorías o por áreas culinarias, y al seleccionar una opción, la lista se regenera automáticamente.
   - Cuenta con paginación para facilitar la navegación entre recetas.
   - Incluye un botón para **generar una receta aleatoria**, obtenida desde la API pública.
   - También cuenta con un selector de idioma para cambiar el idioma de la página.

## 📦 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar el entorno
En el archivo `src/environments/environment.ts`, se define la URL base de la API y el idioma predeterminado:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
  defaultLanguage: 'en'
};
```
Si en el futuro se usa una API en producción, se deberá modificar `environment.prod.ts` con la URL correspondiente.

### 4️⃣ Ejecutar el proyecto
```bash
ng serve
```
El frontend estará disponible en `http://localhost:4200/`.

## 🛠️ Endpoints principales consumidos
El frontend consume los siguientes endpoints de la API propia y de la API pública:

### 🔹 Endpoints de la API propia
- `POST /api/login` → Autenticación de usuario.
- `GET /api/v1/recipes` → Obtener todas las recetas.
- `POST /api/v1/recipes` → Crear una receta.
- `GET /api/v1/recipes/{id}` → Obtener detalle de receta.
- `PUT /api/v1/recipes/{id}` → Actualizar receta.
- `DELETE /api/v1/recipes/{id}` → Eliminar receta.
- `GET /api/v1/categories` → Listar categorías.
- `GET /api/v1/categories/{id}` → Obtener detalle de categoría.
- `GET /api/v1/tags` → Listar etiquetas.

### 🔹 Endpoints de la API pública (TheMealDB)
- `GET /api/v3/recipes/dynamic_list` → Listar recetas externas.
- `GET /api/v3/recipes/categories` → Obtener categorías.
- `GET /api/v3/recipes/areas` → Obtener áreas culinarias.
- `GET /api/v3/recipes/{id}` → Obtener detalle de receta.
- `GET /api/v3/recipes/random` → Obtener receta aleatoria.

## 🔥 Próximas mejoras
- Implementación de guards para rutas protegidas.
- Optimización de carga de imágenes.
- Integración con un sistema de favoritos para recetas.
- Mejoras en la visualización de la interfaz:
  - Hacer que las listas de categorías se desglosen al presionar un botón.
  - Ajustar componentes que no se adaptan correctamente.
  - Mejorar proporciones de divs y distribución visual.

## 📝 Licencia
Este proyecto está bajo la Licencia MIT.

## 📞 Contacto
- **Desarrollador:** Daniel Arias
- **Correo:** danielsam707@gmail.com

