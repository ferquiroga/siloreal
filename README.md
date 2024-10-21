    Funcionalidad entregada:
      Autenticación de usuario, Gestión de tareas e Interfaz de usuario (Funcionalidad parcial)
      Base de datos (completo)

    
  Para correr el proyecto, una vez descargado se deben realizar los siguientes pasos:

    BACKEND:
        1 - acceder por línea de comandos a la carpeta backend y ejecutar el comando npm i
        2 - crear una base de datos y correr el script de migracion "migration.sql" ubicado en la carpeta backend/prisma/migrations/20241020043414_first
        3 - en la carpeta backend crear un archivo con el nombre ".env" y agregar la propiedad:
    
              DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
              
              Ejemplo: DATABASE_URL="postgresql://postgres:postgres@localhost:5432/siloreal?schema=public"
              
    4 - Para ejecutar el backend correr el comando "npm start"

    FRONTEND:
      1 - acceder por línea de comandos a la carpeta frontend y ejecutar el comando npm i
      2 - Para ejecutar el frontend correr el comando "npm start"
