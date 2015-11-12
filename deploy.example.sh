#!/bin/bash

# Bounce pm2 :)
pm2 reload all

# Clone repo
git clone -b master --single-branch https://github.com/m1x0n/asciit.git

# Install dependencies
composer install --no-interaction --prefer-dist --optimize-autoloader

# Create config
cat > .env << EOL
APP_ENV=local
APP_DEBUG=true
APP_KEY=SomeRandomString

DB_HOST=localhost
DB_DATABASE=asciit
DB_USERNAME=username
DB_PASSWORD=password

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

WEBSOCKET_PORT=9092
SERVER_PREFIX=asciit

JWT_SECRET=superpupersecret

AUTH_REDIRECT=/auth
AUTH_ME=/profile/user/getByCentralId
AUTH_LOGOUT=/auth/logout
NOTIFICATIONS=/app/api/notification

JS_PATH=asciit/js/min
JS_IS_MIN=true
USE_COMMON_HEADER=true

LINK_PREVIEW_SCREENSHOT=phantomjs /path/to/rasterize/rasterize.js %url %file 1024px*1024px
SERVER_HOST=http://example.com

EOL

#Generate app key
php artisan key:generate

#Migrate database
php artisan migrate:refresh --seed

# Run tests
phpunit

# Copy to destination folders
cp -rf ./ /home/code/asciit
chmod -R 777 /home/code/asciit/storage
chmod -R 777 /home/code/asciit/bootstrap/cache

# Serve websockets
KILLABLE=`lsof -i tcp:9092 | tail -n 1 | awk '{print $2}'`

if [ -n "$KILLABLE" ]; then
    kill -9 $KILLABLE
else
    echo "PORT 9092 is already free"    
fi

KILLABLEZ=`lsof -i tcp:9091 | tail -n 1 | awk '{print $2}'`

if [ -n "$KILLABLEZ" ]; then
    kill -9 $KILLABLEZ
else
    echo "PORT 9091 is already free"    
fi

# Serve sockets
cd /home/code/asciit
php artisan sockets:serve &

