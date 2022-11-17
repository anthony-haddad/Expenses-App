FROM php:8.0-fpm

ARG uid
ARG user

RUN apt-get update && apt-get install -y vim zip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    && docker-php-ext-install mbstring pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer \
    && chown -R $user:$user /home/$user

WORKDIR /var/www
