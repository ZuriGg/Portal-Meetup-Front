# Meet Up

Una aplicación web para organizar y descubrir eventos. Los usuarios pueden explorar meetups próximos, ver detalles del evento, registrarse y administrar sus propios meetups. Esta aplicación está desarrollada con React y utiliza React Router para la navegación.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)

## Instalación

Para instalar y ejecutar esta aplicación localmente, sigue los siguientes pasos :

1. Clona el repositorio:
   ```bash
   git clone git@github.com:ZuriGg/Portal-Meetup-Front.git
   cd portal-meetup-front
   ```

### Instalar las dependencias:

npm i

### Inicar la aplicación:

npm start

La aplicación estará disponible en http://localhost:3000.

# Características

- Navegación con React Router: Permite una navegación fluida entre páginas sin recargar la aplicación.
- Listado de Meetups: Visualización de eventos próximos en una página de inicio.
- Página de Detalles de Meetup: Información detallada de cada evento con opción de registro.
- Creación y Edición de Meetups: Los usuarios pueden crear y administrar sus propios eventos.
- Búsqueda y Filtrado: Encuentra meetups basados en categorías, fechas y ubicaciones.
- Interfaz amigable y adaptable: Diseñada para proporcionar una experiencia óptima en dispositivos móviles y de escritorio.

# Tecnologías:

- React: Biblioteca principal para la construcción de la interfaz.
- React Router: Biblioteca para la gestión de rutas.
  CSS Modules / Styled Components: (Opcional) Para estilos encapsulados y personalizados.
- Axios / Fetch: (Opcional) Para realizar llamadas a APIs si la aplicación se conecta a una base de datos de eventos externos.

# Estructura del proyecto (ejemplo piloto)

meetup-app/
├── public/ # Archivos públicos
├── src/
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Páginas del sitio (Home, Detalles, Crear Meetup)
│ ├── hooks/ # Custom hooks (si es necesario)
│ ├── App.js # Componente principal
│ ├── index.js # Punto de entrada
│ ├── router.js # Definición de rutas de React Router
│ └── services/ # Servicios para la API (si aplica)
├── README.md
└── package.json

# Uso (ejemplo piloto)

- Página de Inicio: Muestra una lista de meetups. Desde aquí puedes navegar al detalle de cada evento o usar el buscador.
- Detalles de Meetup: Cada evento tiene su página de detalles, que incluye información detallada y un botón para registrarse.
- Administración de Meetups: Puedes crear, editar y eliminar meetups (disponible para usuarios registrados, si aplica).

# Rutas (ejemplo piloto)

- /: Página principal con listado de meetups.
- /meetup/:id: Página de detalles de un meetup específico.
- /create-meetup: Página para crear un nuevo meetup.
- /edit-meetup/:id: Página para editar un meetup existente.
