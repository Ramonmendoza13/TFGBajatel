# Dockerfile para API Laravel con PHP 8.2 CLI y Composer
FROM php:8.2-cli

# Carpeta de trabajo
WORKDIR /var/www

# Instalar dependencias del sistema y extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    libzip-dev \
    libonig-dev \
    libcurl4-openssl-dev \
    && docker-php-ext-install pdo pdo_sqlite zip bcmath

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar proyecto al contenedor
COPY . .

# Instalar dependencias PHP
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Crear carpetas necesarias y dar permisos (Laravel necesita storage y cache)
RUN mkdir -p storage/framework/cache/data \
    storage/framework/views \
    storage/framework/sessions \
    storage/logs \
    bootstrap/cache \
    database \
    && chmod -R 777 storage bootstrap/cache database

# Crear archivo SQLite si no existe
RUN touch database/database.sqlite

# Exponer puerto
EXPOSE 8000

# Copiar entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Comando por defecto: limpiar caches y arrancar servidor PHP en runtime
CMD ["/entrypoint.sh"]
