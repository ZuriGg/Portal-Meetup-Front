# Meet Up

Una aplicación web para organizar y descubrir eventos. Los usuarios pueden explorar meetups próximos, ver detalles del evento, registrarse y administrar sus propios meetups. Esta aplicación está desarrollada con React y utiliza React Router para la navegación.

## Tabla de Contenidos

-   [Instalación](#instalación)
-   [Características](#características)
-   [Tecnologías](#tecnologías)
-   [Estructura del Proyecto](#estructura-del-proyecto)
-   [Uso](#uso)
-   [Contribuciones](#contribuciones)

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

## Características

-   Exploración de Meetups: Lista de eventos próximos con opciones de búsqueda y filtrado por categoría, fecha y ubicación.
-   Detalles de Meetup: Información detallada de cada evento con opción de registro para los usuarios.
-   Gestión de Eventos: Los usuarios registrados pueden crear, editar y eliminar meetups.
-   Autenticación: Registro, inicio de sesión, y recuperación de contraseñas para usuarios.
-   Panel de Usuario: Página de perfil para gestionar datos personales y visualizar meetups registrados.
-   Panel de administrador: Página con los meetups que crean los usuarios y que se encuentran a la espera de validación por parte del admin.
-   Diseño Responsivo: Interfaz amigable optimizada para dispositivos móviles y de escritorio.

## Tecnologías:

-   React: Biblioteca principal para la construcción de la interfaz de usuario.
-   React Router: Gestión de navegación entre rutas.
-   CSS Modules o Styled Components: (Opcional) Para estilos personalizados y encapsulados.
-   Fetch: (Opcional) Para integración con API externas.
-   Node.js y npm: Herramientas utilizadas para gestionar dependencias y scripts.

## Estructura del proyecto (ejemplo piloto)

meetup-app/
├── public/ # Archivos públicos (favicon, index.html)
├── src/
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Páginas principales (Inicio, Detalles, Crear Meetup)
│ ├── hooks/ # Hooks personalizados (opcional)
│ ├── services/ # Servicios para interacciones con API
│ ├── App.js # Componente principal
│ ├── index.js # Punto de entrada
│ ├── router.js # Definición de rutas con React Router
└── package.json # Configuración de dependencias y scripts

## Uso

### Navegación

-   Página de Inicio: Explora una lista de meetups disponibles. Usa el buscador para filtrar por categoría, fecha o ubicación.
-   Detalles del Meetup: Visualiza información detallada de un meetup específico y regístrate para asistir.
-   Gestión de Meetups: Si eres un usuario registrado, puedes crear, editar o eliminar tus propios eventos desde el panel de administración.
-   Autenticación: Inicia sesión o regístrate para acceder a funcionalidades exclusivas. Recupera tu contraseña desde la opción de recuperación en caso necesario.

## Rutas

El proyecto utiliza React Router para gestionar las siguientes rutas:

### Rutas Generales

-   / : Página principal con listado de meetups.
-   '\*': Redirección a página de error (NotFound).

## Rutas de Usuario

-   /user/register : Registro de usuario.
-   /user/login : Inicio de sesión.
-   /user/validate : Confirmación de validación del usuario.
-   /user/profile : Perfil del usuario registrado.
-   /user/password/recover : Recuperación de contraseña.
-   /user/password/changepass : Cambio de contraseña.
-   /user/edit : Edición de datos personales.
-   /user/avatar : Subida o cambio de avatar.

## Rutas de Meetups

-   /meetup/create : Creación de un nuevo meetup.
-   /meetup/:meetupId : Página de detalles de un meetup.
-   /meetup/:meetupId/edit : Edición de un meetup existente.
-   /meetup/:attendanceId/votes : Sistema de valoración para asistentes.

## Ruta de Administración

-   /admin : Página de administración para gestionar usuarios o meetups.

## Contribuciones

Si deseas contribuir al proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección:
   `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit de ellos:
   `git commit -m "Añadir nueva funcionalidad"`.
4. Envía tus cambios:
   `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request en el repositorio original.
