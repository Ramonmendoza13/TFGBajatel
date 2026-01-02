#!/bin/sh
# entrypoint.sh

# Crear SQLite si no existe
touch /tmp/database.sqlite

# Limpiar caches de Laravel en runtime
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Arrancar servidor PHP apuntando a la carpeta public
php -S 0.0.0.0:8000 -t public