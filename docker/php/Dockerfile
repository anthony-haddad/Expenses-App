FROM php:8.0-fpm

RUN apt-get update && apt-get install -y vim zip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    && docker-php-ext-install mbstring pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN chown -R www-data:www-data /var/www/backend/storage

WORKDIR /var/www
