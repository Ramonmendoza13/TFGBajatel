#!/bin/sh
# entrypoint.sh

# Crear SQLite si no existe
touch /tmp/database.sqlite

# Ejecutar migraciones
php artisan migrate --force

# Ejecutar seeders
php artisan db:seed --force

# Limpiar caches de Laravel en runtime
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Generar documentación de Swagger
php artisan l5-swagger:generate

# Arrancar servidor PHP apuntando a la carpeta public
php -S 0.0.0.0:8000 -t public