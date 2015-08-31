#!/bin/bash

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
AUTH_ME=/auth/api/me
AUTH_LOGOUT=/auth/logout

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
# Kill process on port 9092 if it exists
KILLABLE=`lsof -i tcp:9092 | tail -n 1 | awk '{print $2}'`

if [ -n "$KILLABLE" ]; then
    kill -9 $KILLABLE
else
    echo "PORT 9092 is already free"    
fi

# Serve sockets
cd /home/code/asciit
php artisan sockets:serve &

