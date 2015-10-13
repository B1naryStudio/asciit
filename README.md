# Asciit
BSA 2015 Forum Project

### Развертывание в системном окружении разработчика:
1. Клонирование репозитория

    ```
    git clone https://github.com/m1x0n/asciit.git
    ```
    или по ssh:
    ```
    git clone git@github.com:m1x0n/asciit.git
    ```

    Команда создаст в текущей директории поддиректорию с именем проекта, в которой
     будут расположены склонированные файлы репозитория.

3. Создание локальной версии ветки `development`

   - Перейти в папку проекта:

        ```
        cd asciit
        ```

   - Создать ветку:

        ```
        git checkout development
        ```

2. Установка зависимостей

    ```
    composer install
    ```

4. Создание таблиц в базе данных

   - Создать в СУБД базу данных `ascit`
   - Добавить в основной директории проекта файл с именем `.env` по примеру
   `.env.example` и исправить в нем настройки базы данных на актуальные. Например:

       ```
       DB_HOST=192.168.10.10
       DB_DATABASE=ascit
       DB_USERNAME=homestead
       DB_PASSWORD=secret
       ```

   - запустить миграции

       ```
       php artisan migrate
       ```

5. Заполнение таблиц тестовыми данными

    ```
    php artisan db:seed
    ```

    Тестовые пользователи:

    ```
    email: admin@admin.com
    pass:  admin

    email: cypherpunks01@europe.com
    pass:  cypherpunks01
    ```
    У всех остальных пользователей случайно сгенерированый email и пароль `secret`.

6. Включение обновления в реальном времени

    6.1 Настройка сервиса доставки сообщений от HTTP-сервера к WAMP-серверу

       Возможно использование доставки с помощью HTTP-клиента GOS либо сервера очередей
       ZMQ.

       - Установить в ```app/Providers/WebSocketsServiceProvider.php```
       соответствующую абстрактную фабрику (```GOSWebSocketFactory``` или ```ZeroMQWebSocketFactory```).

    В случае использования ZMQ, необходимо установить PHP-расширение. Приведен
    код для установки на Debian-based системах. Команды и версии пакетов могут
    отличаться.

    - Установить расширение

       ```
       sudo apt-get install gcc make autoconf pkg-config
       sudo apt-get install libzmq-dev
       sudo pecl install zmq-beta
       ```

    -  Добавить в файлы настроек ```/etc/php5/cli/php.ini``` и
        ```/etc/php5/fpm/php.ini``` строку ```extension=zmq.so```

    - Создать в папке ```/etc/php5/mods-available/``` файл ```zmq.ini```
    с содержимым ```extension=zmq.so```

    - Перезапустить демона php:

    ```
    sudo service php5-fpm restart
    ```

    - Проверить установку
    ```
    php5 -i | grep zmq
    ```
    При успешной установке будет похожий вывод:
    ```
    /etc/php5.X-sp/conf.d/zmq.ini
    zmq
    libzmq version => 2.2.0
    ```

    6.2 Запустить WAMP-сервер
       ```
       php artisan sockets:serve
       ```
       Команда запустит WAMP-сервер для рассылки сообщений о новых вопросах,
       ответах и комментариях.

       **Важно:** команду нужно запускать на том же окружении, в котором будет
       работать HTTP-сервер. То есть, если вы работаете через Homestead -
       запускать команду нужно под виртуальной машиной:

       - Зайти по ssh:

       ```
       ssh vagrant@127.0.0.1 -p 2222
       ```

       - Перейти в папку проекта:

       ```
       cd Code/ascit/
       ```

       - Запустить WAMP-сервер

       ```
       php artisan sockets:serve
       ```